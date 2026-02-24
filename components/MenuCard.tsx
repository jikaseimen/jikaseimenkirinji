"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

type Props = {
  name: string;
  price: number;
  category: string;
};

export default function MenuCard({ name, price, category }: Props) {
  const { dispatch, state } = useCart();
  const [added, setAdded] = useState(false);

  const cartItem = state.items.find((i) => i.name === name);
  const qty = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    dispatch({ type: "ADD", item: { name, price, category } });
    setAdded(true);
    setTimeout(() => setAdded(false), 600);
  };

  const isTopping = category === "トッピング・サイド";

  return (
    <div
      className="menu-card bg-kirinji-charcoal border border-white/5 rounded-xl p-4 flex items-center justify-between gap-3 active:bg-kirinji-darkgray"
      style={{ boxShadow: qty > 0 ? "0 0 0 1.5px #FFD700" : undefined }}
    >
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {isTopping && (
            <span className="text-[9px] bg-kirinji-yellow/20 text-kirinji-yellow px-1.5 py-0.5 rounded font-bold tracking-wider shrink-0">
              ADD
            </span>
          )}
          <p className="text-white font-bold text-sm leading-snug truncate">{name}</p>
        </div>
        <p
          className="text-kirinji-yellow font-black mt-1"
          style={{ fontFamily: "'Bebas Neue', serif", fontSize: "1.3rem", letterSpacing: "0.03em" }}
        >
          ¥{price.toLocaleString()}
        </p>
      </div>

      {/* Controls */}
      {qty > 0 ? (
        <div className="flex items-center gap-1 bg-kirinji-darkgray rounded-full border border-kirinji-yellow/30 overflow-hidden">
          <button
            onClick={() => dispatch({ type: "UPDATE_QTY", name, quantity: qty - 1 })}
            className="w-8 h-8 flex items-center justify-center text-kirinji-yellow font-black text-lg active:bg-kirinji-yellow/20"
          >
            −
          </button>
          <span className="w-6 text-center text-white font-bold text-sm">{qty}</span>
          <button
            onClick={handleAdd}
            className="w-8 h-8 flex items-center justify-center text-kirinji-yellow font-black text-lg active:bg-kirinji-yellow/20"
          >
            ＋
          </button>
        </div>
      ) : (
        <button
          onClick={handleAdd}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xl transition-all ${
            added
              ? "bg-kirinji-yellow text-kirinji-black scale-110"
              : "bg-kirinji-yellow/10 text-kirinji-yellow border border-kirinji-yellow/40 active:bg-kirinji-yellow active:text-kirinji-black"
          }`}
        >
          ＋
        </button>
      )}
    </div>
  );
}
