"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";
import { useLiff } from "@/lib/useLiff";
import { generateTicketNumber } from "@/lib/ticket";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type SendState = "idle" | "sending" | "dispensing" | "error";

export default function CartPanel({ isOpen, onClose }: Props) {
  const { state, dispatch, total } = useCart();
  const liffStatus = useLiff();
  const router = useRouter();
  const [sendState, setSendState] = useState<SendState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [isTakeout, setIsTakeout] = useState(false);

  const buildMessageText = (ticketNumber: string) => {
    const lines = state.items.map(
      (i) => `・${i.name}  ×${i.quantity}  ¥${(i.price * i.quantity).toLocaleString()}`
    );
    const typeLabel = isTakeout ? "【テイクアウト】" : "【店内飲食】";
    return [
      `🎫 食券 No.${ticketNumber} ${typeLabel} — キリンジ`,
      "──────────────",
      ...lines,
      "──────────────",
      `合計  ¥${total.toLocaleString()}`,
    ].join("\n");
  };

  const handleOrder = async () => {
    if (sendState === "sending" || sendState === "dispensing") return;
    const ticketNumber = generateTicketNumber();
    const text = buildMessageText(ticketNumber);

    setSendState("sending");
    setErrorMsg("");
    try {
      if (liffStatus.state === "ready") {
        const { default: liff } = await import("@line/liff");
        if (!liff.isInClient()) {
          console.log("【LINE送信プレビュー（ブラウザ環境）】\n" + text);
        } else {
          await liff.sendMessages([{ type: "text", text }]);
        }
      } else {
        console.log("【LINE送信プレビュー（LIFF未初期化）】\n" + text);
      }

      sessionStorage.setItem(
        "kirinji-ticket",
        JSON.stringify({
          ticketNumber,
          items: state.items,
          total,
          isTakeout,
          issuedAt: Date.now(),
        })
      );

      setSendState("dispensing");
      dispatch({ type: "CLEAR" });
      setTimeout(() => {
        router.push("/complete");
      }, 900);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[LIFF] sendMessages error:", err);
      setErrorMsg(msg);
      setSendState("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto slide-up">
        <div className="bg-kirinji-charcoal rounded-t-3xl border-t border-kirinji-yellow/30 max-h-[85vh] flex flex-col">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-white/20 rounded-full" />
          </div>
          <div className="px-5 py-3 flex items-center justify-between border-b border-white/10">
            <h2
              className="text-white font-black text-2xl tracking-wider"
              style={{ fontFamily: "'Bebas Neue', serif" }}
            >
              TICKET
            </h2>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white text-2xl w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          <div className="px-5 pt-4 pb-2">
            <div className="flex bg-kirinji-black rounded-2xl p-1 border border-white/10">
              <button
                onClick={() => setIsTakeout(false)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-black tracking-wider transition-all ${
                  !isTakeout ? "bg-kirinji-yellow text-kirinji-black" : "text-white/40"
                }`}
                style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                🍜 店内飲食
              </button>
              <button
                onClick={() => setIsTakeout(true)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-black tracking-wider transition-all ${
                  isTakeout ? "bg-kirinji-yellow text-kirinji-black" : "text-white/40"
                }`}
                style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                🥡 テイクアウト
              </button>
            </div>
            {isTakeout && (
              <p className="text-white/40 text-[11px] text-center mt-2">
                ※ 受け取り時間の目安は発券後に表示されます（約15分）
              </p>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-3">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="text-5xl opacity-20">🍜</div>
                <p className="text-white/30 text-sm font-bold">カートは空です</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {state.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-bold truncate">{item.name}</p>
                      <p className="text-white/40 text-xs">
                        ¥{item.price.toLocaleString()} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-kirinji-black rounded-full border border-white/10">
                      <button
                        onClick={() =>
                          dispatch({ type: "UPDATE_QTY", name: item.name, quantity: item.quantity - 1 })
                        }
                        className="w-7 h-7 flex items-center justify-center text-kirinji-yellow font-black text-base"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-white text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch({ type: "UPDATE_QTY", name: item.name, quantity: item.quantity + 1 })
                        }
                        className="w-7 h-7 flex items-center justify-center text-kirinji-yellow font-black text-base"
                      >
                        ＋
                      </button>
                    </div>
                    <p
                      className="text-kirinji-yellow font-black text-base w-20 text-right shrink-0"
                      style={{ fontFamily: "'Bebas Neue', serif", letterSpacing: "0.03em" }}
                    >
                      ¥{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {state.items.length > 0 && (
            <div className="px-5 py-5 border-t border-white/10 bg-kirinji-charcoal">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/60 font-bold text-sm">合計金額</span>
                <span
                  className="text-kirinji-yellow font-black text-3xl"
                  style={{ fontFamily: "'Bebas Neue', serif", letterSpacing: "0.02em" }}
                >
                  ¥{total.toLocaleString()}
                </span>
              </div>
              <button
                onClick={handleOrder}
                disabled={sendState === "sending" || sendState === "dispensing"}
                className={`w-full font-black py-4 rounded-2xl text-base tracking-wider transition-all flex items-center justify-center gap-2 vending-button ${
                  sendState === "dispensing"
                    ? "bg-green-500 text-white"
                    : sendState === "error"
                    ? "bg-red-500 text-white"
                    : sendState === "sending"
                    ? "bg-kirinji-amber/70 text-kirinji-black"
                    : "bg-kirinji-yellow text-kirinji-black active:scale-[0.98]"
                }`}
                style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 900 }}
              >
                {sendState === "sending"
                  ? "発券中…"
                  : sendState === "dispensing"
                  ? "🎫 食券が出てきました"
                  : sendState === "error"
                  ? "⚠ 発券失敗 — タップで再試行"
                  : "食券を発行する"}
              </button>
              {sendState === "error" && errorMsg && (
                <p className="text-red-400/60 text-[11px] text-center mt-1.5 px-2">{errorMsg}</p>
              )}
              <p className="text-white/25 text-[11px] text-center mt-3 leading-relaxed">
                ボタンを押すと食券が発行されます。お会計はスタッフにお申し付けください。
              </p>
              <button
                onClick={() => dispatch({ type: "CLEAR" })}
                className="w-full mt-2 py-2 text-white/30 text-xs font-bold tracking-wider"
              >
                カートを空にする
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
