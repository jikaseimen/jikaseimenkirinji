"use client";

import { useCart } from "./CartContext";

export default function Header({ onCartClick }: { onCartClick: () => void }) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-kirinji-black border-b border-kirinji-yellow/20">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Logo area */}
        <div className="flex flex-col leading-none">
          <span
            className="text-kirinji-yellow tracking-widest uppercase text-xs font-bold"
            style={{ fontFamily: "'Bebas Neue', serif", letterSpacing: "0.2em" }}
          >
            自家製麺
          </span>
          <span
            className="text-white text-3xl font-black tracking-wider"
            style={{ fontFamily: "'Bebas Neue', serif", letterSpacing: "0.05em" }}
          >
            KIRINJI
          </span>
          <span className="text-kirinji-yellow/60 text-[10px] tracking-widest -mt-1">
            カスラーメン自家製麺キリンジ
          </span>
        </div>

        {/* Cart button */}
        <button
          onClick={onCartClick}
          className="relative flex items-center gap-2 bg-kirinji-yellow text-kirinji-black px-4 py-2 rounded-full font-black text-sm active:scale-95 transition-transform"
          style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <span>カート</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold badge-pulse">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Yellow accent line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-kirinji-yellow to-transparent" />
    </header>
  );
}
