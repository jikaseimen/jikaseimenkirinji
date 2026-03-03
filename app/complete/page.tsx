"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CompleteContent() {
  const params = useSearchParams();
  const type = params.get("type");
  const orderNumber = params.get("order");
  const pickupRaw = params.get("pickup");
  const isTakeout = type === "takeout" && orderNumber && pickupRaw;
  const pickupTime = pickupRaw ? pickupRaw.slice(0, 2) + ":" + pickupRaw.slice(2, 4) : "";

  return (
    <div className="min-h-screen bg-kirinji-black flex flex-col items-center justify-center px-6 gap-6">
      <div className="text-6xl">✅</div>
      <h1
        className="text-kirinji-yellow text-4xl font-black tracking-wider text-center"
        style={{ fontFamily: "'Bebas Neue', serif" }}
      >
        {isTakeout ? "テイクアウト注文完了" : "お支払い完了"}
      </h1>
      {isTakeout ? (
        <div>
          <div className="w-full max-w-xs bg-kirinji-charcoal rounded-3xl border border-kirinji-yellow/30 px-6 py-6 flex flex-col items-center gap-4">
            <p className="text-white/50 text-xs font-bold tracking-widest uppercase">Order Number</p>
            <p className="text-kirinji-yellow text-6xl font-black tracking-widest" style={{ fontFamily: "'Bebas Neue', serif" }}>
              {orderNumber}
            </p>
            <div className="w-full h-px bg-white/10" />
            <p className="text-white/50 text-xs font-bold tracking-widest uppercase">受け取り時間の目安</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🕐</span>
              <p className="text-white text-4xl font-black" style={{ fontFamily: "'Bebas Neue', serif" }}>
                {pickupTime} 頃
              </p>
            </div>
          </div>
          <div className="bg-kirinji-yellow/10 border border-kirinji-yellow/20 rounded-2xl px-5 py-4 max-w-xs w-full mt-4">
            <p className="text-kirinji-yellow text-xs font-bold text-center leading-relaxed">
              📍 お店でこの番号をお伝えください
              <br />
              <span className="text-white/60 font-normal">商品ができましたらお呼びします</span>
            </p>
          </div>
          <p className="text-white/40 text-xs text-center leading-relaxed mt-4">
            ご注文ありがとうございます。
            <br />
            準備ができましたらお声がけします。
          </p>
        </div>
      ) : (
        <p className="text-white/60 text-sm text-center leading-relaxed">
          ご注文ありがとうございます。
          <br />
          お席でお待ちください。
        </p>
      )}
      
        href="/"
        className="bg-kirinji-yellow text-kirinji-black font-black px-8 py-3 rounded-full text-sm tracking-wider"
        style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
      >
        トップに戻る
      </a>
    </div>
  );
}

export default function CompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-kirinji-black flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-kirinji-yellow/30 border-t-kirinji-yellow rounded-full animate-spin" />
        </div>
      }
    >
      <CompleteContent />
    </Suspense>
  );
}
