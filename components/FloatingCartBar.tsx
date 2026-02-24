"use client";

import { useCart } from "./CartContext";

export default function FloatingCartBar({ onCartClick }: { onCartClick: () => void }) {
  const { totalItems, total } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 px-4 pb-6 pt-2 bg-gradient-to-t from-kirinji-black to-transparent pointer-events-none">
      <button
        onClick={onCartClick}
        className="w-full pointer-events-auto bg-kirinji-yellow text-kirinji-black rounded-2xl py-4 px-5 flex items-center justify-between active:scale-98 transition-transform shadow-2xl animate-slide-up"
        style={{ boxShadow: "0 8px 32px rgba(255, 215, 0, 0.3)" }}
      >
        <div className="flex items-center gap-2">
          <span className="bg-kirinji-black text-kirinji-yellow text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
          <span className="font-black text-sm" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
            カートを見る
          </span>
        </div>
        <span
          className="font-black text-xl"
          style={{ fontFamily: "'Bebas Neue', serif", letterSpacing: "0.03em" }}
        >
          ¥{total.toLocaleString()}
        </span>
      </button>
    </div>
  );
}
