import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PAYPAY_API_URL = "https://stg.paypay.ne.jp"; // サンドボックス環境
// 本番環境は "https://api.paypay.ne.jp" に変更

type CartItem = {
  name: string;
  price: number;
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

export async function POST(req: NextRequest) {
  try {
    const { items, total } = (await req.json()) as {
      items: CartItem[];
      total: number;
    };

    const apiKey = process.env.PAYPAY_API_KEY;
    const apiSecret = process.env.PAYPAY_API_SECRET;
    const merchantId = process.env.PAYPAY_MERCHANT_ID;

    if (!apiKey || !apiSecret || !merchantId) {
      return NextResponse.json(
        { error: "PayPay環境変数が未設定です" },
        { status: 500 }
      );
    }

    const merchantPaymentId = generateMerchantPaymentId();
    const epoch = Math.floor(Date.now() / 1000);
    const nonce = crypto.randomBytes(8).toString("hex");
    const path = "/v2/qrcode";

    const orderItems = items.map((item) => ({
      name: item.name,
      category: "ラーメン",
      quantity: item.quantity,
      productId: item.name,
      unitPrice: { amount: item.price, currency: "JPY" },
    }));

    const payload = {
      merchantPaymentId,
      amount: { amount: total, currency: "JPY" },
      codeType: "ORDER_QR",
      orderDescription: "カスラーメン自家製麺キリンジ",
      orderItems,
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://jikaseimenkirinji.vercel.app"}/complete`,
      redirectType: "WEB_LINK",
    };

    const body = JSON.stringify(payload);
    const signature = generateHmacSignature(
      "POST",
      path,
      body,
      epoch,
      nonce,
      apiSecret
    );

    const authHeader = `hmac OPA-Auth:${apiKey}:${nonce}:${epoch}:${signature}`;

    const response = await fetch(`${PAYPAY_API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body,
    });

    const data = await response.json();

    if (!response.ok || data.resultInfo?.code !== "SUCCESS") {
      console.error("[PayPay] Error:", data);
      return NextResponse.json(
        { error: data.resultInfo?.message ?? "PayPay APIエラー" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      url: data.data?.url,
      merchantPaymentId,
    });
  } catch (err) {
    console.error("[PayPay] Exception:", err);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
