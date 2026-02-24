"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { useLiff } from "@/lib/useLiff";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type SendState = "idle" | "sending" | "done" | "error";

export default function CartPanel({ isOpen, onClose }: Props) {
  const { state, dispatch, total } = useCart();
  const liffStatus = useLiff();
  const [sendState, setSendState] = useState<SendState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const buildMessageText = () => {
    const lines = state.items.map(
      (i) => `・${i.name}  ×${i.quantity}  ¥${(i.price * i.quantity).toLocaleString()}`
    );
    return [
      "🍜 ご注文内容 — キリンジ",
      "──────────────",
      ...lines,
      "──────────────",
      `合計  ¥${total.toLocaleString()}`,
    ].join("\n");
  };

  const handleOrder = async () => {
    if (sendState === "sending") return;

    const text = buildMessageText();

    // LIFF未初期化・環境変数未設定時はコンソール出力のみ
    if (liffStatus.state !== "ready") {
      console.log("【LINE送信プレビュー（LIFF未初期化）】\n" + text);
      setSendState("done");
      setTimeout(() => setSendState("idle"), 3000);
      return;
    }

    setSendState("sending");
    setErrorMsg("");

    try {
      const { default: liff } = await import("@line/liff");

      if (!liff.isInClient()) {
        // ブラウザ（非LIFFクライアント）: sendMessages は使えないためログのみ
        console.log("【LINE送信プレビュー（ブラウザ環境）】\n" + text);
      } else {
        await liff.sendMessages([{ type: "text", text }]);
      }

      setSendState("done");
      dispatch({ type: "CLEAR" });
      setTimeout(() => {
        setSendState("idle");
        onClose();
      }, 1800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[LIFF] sendMessages error:", err);
      setErrorMsg(msg);
      setSendState("error");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto slide-up">
        <div className="bg-kirinji-charcoal rounded-t-3xl border-t border-kirinji-yellow/30 max-h-[80vh] flex flex-col">
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-white/20 rounded-full" />
          </div>

          {/* Header */}
          <div className="px-5 py-3 flex items-center justify-between border-b border-white/10">
            <h2
              className="text-white font-black text-2xl tracking-wider"
              style={{ fontFamily: "'Bebas Neue', serif" }}
            >
              CART
            </h2>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white text-2xl w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Items */}
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

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="px-5 py-5 border-t border-white/10 bg-kirinji-charcoal rounded-b-none">
              {/* Total */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/60 font-bold text-sm">合計金額</span>
                <span
                  className="text-kirinji-yellow font-black text-3xl"
                  style={{ fontFamily: "'Bebas Neue', serif", letterSpacing: "0.02em" }}
                >
                  ¥{total.toLocaleString()}
                </span>
              </div>

              {/* LIFF status indicator */}
              {liffStatus.state === "loading" && (
                <p className="text-white/30 text-xs text-center mb-3 flex items-center justify-center gap-1.5">
                  <span className="inline-block w-3 h-3 border-2 border-white/20 border-t-kirinji-yellow rounded-full animate-spin" />
                  LINE接続中…
                </p>
              )}
              {liffStatus.state === "error" && (
                <p className="text-red-400/70 text-xs text-center mb-3">
                  ⚠ {liffStatus.message}
                </p>
              )}

              {/* Order button */}
              <button
                onClick={handleOrder}
                disabled={sendState === "sending" || sendState === "done"}
                className={`w-full font-black py-4 rounded-2xl text-base tracking-wider transition-all flex items-center justify-center gap-2 ${
                  sendState === "done"
                    ? "bg-green-500 text-white scale-100"
                    : sendState === "error"
                    ? "bg-red-500 text-white"
                    : sendState === "sending"
                    ? "bg-kirinji-amber/70 text-kirinji-black"
                    : "bg-kirinji-yellow text-kirinji-black active:scale-[0.98]"
                }`}
                style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 900 }}
              >
                {sendState === "sending" ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-kirinji-black/30 border-t-kirinji-black rounded-full animate-spin" />
                    送信中…
                  </>
                ) : sendState === "done" ? (
                  <>✓ 送信しました</>
                ) : sendState === "error" ? (
                  <>⚠ 送信失敗 — タップで再試行</>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                    注文する（LINEで送信）
                  </>
                )}
              </button>

              {/* Error detail */}
              {sendState === "error" && errorMsg && (
                <p className="text-red-400/60 text-[11px] text-center mt-1.5 px-2">{errorMsg}</p>
              )}

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
    </>
  );
}
