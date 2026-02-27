import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { MENU_DATA } from "@/lib/menu";

const PAYPAY_API_URL = "https://stg.paypay.ne.jp"; // サンドボックス環境
// 本番環境は "https://api.paypay.ne.jp" に変更

// ----------------------------------------
// メニューデータからname->priceのMapを生成（金額改ざん防止）
// ----------------------------------------
const PRICE_MAP = new Map<string, number>();
for (const cat of MENU_DATA) {
  for (const item of cat.items) {
    PRICE_MAP.set(item.name, item.price);
  }
}

// ----------------------------------------
// レート制限（IPごとに1分間10リクエストまで）
// ----------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

type CartItem = {
  name: string;
  quantity: number;
};

function generateMerchantPaymentId(): string {
  return `kirinji_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
}

function generateHmacSignature(
  method: string,
  path: string,
  body: string,
  epoch: number,
  nonce: string,
  apiSecret: string
): string {
  const message = [method, path, epoch, nonce, body].join("\n");
  return crypto.createHmac("sha256", apiSecret).update(message).digest("base64");
}

// ----------------------------------------
// CORS: 自サイトからのリクエストのみ許可
// ----------------------------------------
const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_APP_URL ?? "https://jikaseimenkirinji.vercel.app";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function POST(req: NextRequest) {
  // CORS チェック
  const origin = req.headers.get("origin") ?? "";
  if (origin && origin !== ALLOWED_ORIGIN) {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 403 });
  }

  // レート制限チェック
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。しばらく待ってから再試行してください。" },
      { status: 429, headers: corsHeaders() }
    );
  }

  try {
    const body = await req.json();
    const items = body.items as CartItem[];

    // ----------------------------------------
    // 金額改ざん防止：サーバー側でメニューから正規の金額を取得して再計算
    // ----------------------------------------
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "カートが空です" },
        { status: 400, headers: corsHeaders() }
      );
    }

    // 数量バリデーション
    for (const item of items) {
      if (
        typeof item.name !== "string" ||
        typeof item.quantity !== "number" ||
        item.quantity < 1 ||
        item.quantity > 99 ||
        !Number.isInteger(item.quantity)
      ) {
        return NextResponse.json(
          { error: "不正な注文内容です" },
          { status: 400, headers: corsHeaders() }
        );
      }

      if (!PRICE_MAP.has(item.name)) {
        return NextResponse.json(
          { error: `「${item.name}」はメニューに存在しません` },
          { status: 400, headers: corsHeaders() }
        );
      }
    }

    // サーバー側で正規の金額を使って合計を計算
    const verifiedTotal = items.reduce((sum, item) => {
      const price = PRICE_MAP.get(item.name)!;
      return sum + price * item.quantity;
    }, 0);

    const apiKey = process.env.PAYPAY_API_KEY;
    const apiSecret = process.env.PAYPAY_API_SECRET;
    const merchantId = process.env.PAYPAY_MERCHANT_ID;

    if (!apiKey || !apiSecret || !merchantId) {
      return NextResponse.json(
        { error: "PayPay環境変数が未設定です" },
        { status: 500, headers: corsHeaders() }
      );
    }

    const merchantPaymentId = generateMerchantPaymentId();
    const epoch = Math.floor(Date.now() / 1000);
    const nonce = crypto.randomBytes(8).toString("hex");
    const apiPath = "/v2/qrcode";

    const orderItems = items.map((item) => ({
      name: item.name,
      category: "ラーメン",
      quantity: item.quantity,
      productId: item.name,
      unitPrice: { amount: PRICE_MAP.get(item.name)!, currency: "JPY" },
    }));

    const payload = {
      merchantPaymentId,
      amount: { amount: verifiedTotal, currency: "JPY" },
      codeType: "ORDER_QR",
      orderDescription: "カスラーメン自家製麺キリンジ",
      orderItems,
      redirectUrl: `${ALLOWED_ORIGIN}/complete`,
      redirectType: "WEB_LINK",
    };

    const payloadBody = JSON.stringify(payload);
    const signature = generateHmacSignature(
      "POST",
      apiPath,
      payloadBody,
      epoch,
      nonce,
      apiSecret
    );

    const authHeader = `hmac OPA-Auth:${apiKey}:${nonce}:${epoch}:${signature}`;

    const response = await fetch(`${PAYPAY_API_URL}${apiPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: payloadBody,
    });

    const data = await response.json();

    if (!response.ok || data.resultInfo?.code !== "SUCCESS") {
      console.error("[PayPay] Error:", data);
      return NextResponse.json(
        { error: data.resultInfo?.message ?? "PayPay APIエラー" },
        { status: 400, headers: corsHeaders() }
      );
    }

    return NextResponse.json(
      { url: data.data?.url, merchantPaymentId },
      { headers: corsHeaders() }
    );
  } catch (err) {
    console.error("[PayPay] Exception:", err);
    return NextResponse.json(
      { error: "サーバーエラー" },
      { status: 500, headers: corsHeaders() }
    );
  }
}
