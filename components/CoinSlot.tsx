"use client";

import { useCart } from "./CartContext";

const BILLS = [1000];
const COINS = [500, 100, 50, 10];

export default function CoinSlot() {
  const { state, dispatch } = useCart();
  const { insertedAmount } = state;

  const insert = (amount: number) => dispatch({ type: "INSERT_MONEY", amount });
  const returnChange = () => dispatch({ type: "RETURN_CHANGE" });

  return (
    <div className="bg-kirinji-charcoal border-b-2 border-kirinji-amber/60 px-4 py-3">
      <div className="flex items-stretch gap-3">
        {/* LCD balance display */}
        <div className="flex-1 min-w-0 bg-black rounded-lg border border-kirinji-amber/30 px-3 py-2 flex flex-col justify-center">
          <p className="text-white/30 text-[9px] font-bold tracking-widest">ただいまの金額</p>
          <p
            className="text-green-400 font-black text-2xl leading-tight tracking-wider lcd-glow truncate"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            ¥{insertedAmount.toLocaleString()}
          </p>
        </div>

        {/* Return change lever */}
        <button
          onClick={returnChange}
          disabled={insertedAmount === 0}
          className={`shrink-0 w-16 rounded-lg border font-bold text-[10px] flex flex-col items-center justify-center gap-1 transition-all ${
            insertedAmount === 0
              ? "border-white/10 text-white/20"
              : "border-kirinji-amber/60 text-kirinji-amber active:scale-95 active:bg-kirinji-amber/10"
          }`}
        >
          <span className="text-lg leading-none">↺</span>
          <span className="tracking-widest">
            おつり
            <br />
            返却
          </span>
        </button>
      </div>

      {/* Insert buttons */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-white/30 text-[10px] font-bold shrink-0">紙幣</span>
        {BILLS.map((amount) => (
          <button
            key={amount}
            onClick={() => insert(amount)}
            className="coin-button bg-kirinji-amber text-kirinji-black rounded-md px-3 py-1.5 text-xs font-black active:scale-95"
          >
            ¥{amount.toLocaleString()}
          </button>
        ))}
        <span className="text-white/30 text-[10px] font-bold shrink-0 ml-2">硬貨</span>
        {COINS.map((amount) => (
          <button
            key={amount}
            onClick={() => insert(amount)}
            className="coin-button bg-white/90 text-kirinji-black rounded-full w-9 h-9 text-[11px] font-black active:scale-95 shrink-0"
          >
            {amount}
          </button>
        ))}
      </div>
    </div>
  );
}
