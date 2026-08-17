"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Ticket, calcPickupTime } from "@/lib/ticket";

function TicketView({ ticket }: { ticket: Ticket }) {
  const pickupTime = ticket.isTakeout ? calcPickupTime(ticket.issuedAt) : "";

  return (
    <div className="min-h-screen bg-kirinji-black flex flex-col items-center justify-center px-6 gap-6 py-10">
      <div className="text-6xl">🎫</div>
      <h1
        className="text-kirinji-yellow text-4xl font-black tracking-wider text-center"
        style={{ fontFamily: "'Bebas Neue', serif" }}
      >
        食券発行完了
      </h1>

      <div className="w-full max-w-xs bg-kirinji-charcoal rounded-3xl border border-kirinji-yellow/30 px-6 py-6 flex flex-col gap-4 ticket-stub">
        <div className="flex items-center justify-between">
          <p className="text-white/50 text-xs font-bold tracking-widest uppercase">Ticket No.</p>
          <p
            className="text-kirinji-yellow text-3xl font-black tracking-widest"
            style={{ fontFamily: "'Bebas Neue', serif" }}
          >
            {ticket.ticketNumber}
          </p>
        </div>
        <div className="w-full h-px bg-white/10" />

        <div className="flex flex-col gap-2">
          {ticket.items.map((i) => (
            <div key={i.name} className="flex items-center justify-between text-sm">
              <span className="text-white/80 font-bold">
                {i.name} <span className="text-white/40 font-normal">×{i.quantity}</span>
              </span>
              <span className="text-white/60">¥{(i.price * i.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-white/10" />
        <div className="flex items-center justify-between">
          <span className="text-white/60 font-bold text-sm">合計金額</span>
          <span
            className="text-kirinji-yellow font-black text-2xl"
            style={{ fontFamily: "'Bebas Neue', serif" }}
          >
            ¥{ticket.total.toLocaleString()}
          </span>
        </div>

        <div className="w-full h-px bg-white/10" />
        <p className="text-white text-sm font-bold text-center">
          {ticket.isTakeout ? "🥡 テイクアウト" : "🍜 店内飲食"}
        </p>
        {ticket.isTakeout && (
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🕐</span>
            <p className="text-white text-2xl font-black" style={{ fontFamily: "'Bebas Neue', serif" }}>
              {pickupTime} 頃 受け取り目安
            </p>
          </div>
        )}
      </div>

      <div className="bg-kirinji-yellow/10 border border-kirinji-yellow/20 rounded-2xl px-5 py-4 max-w-xs w-full">
        <p className="text-kirinji-yellow text-xs font-bold text-center leading-relaxed">
          📍 この画面をスタッフにお見せください
          <br />
          <span className="text-white/60 font-normal">お会計はレジにてお願いいたします</span>
        </p>
      </div>

      <Link
        href="/"
        className="bg-kirinji-yellow text-kirinji-black font-black px-8 py-3 rounded-full text-sm tracking-wider"
        style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
      >
        トップに戻る
      </Link>
    </div>
  );
}

function NoTicketView() {
  return (
    <div className="min-h-screen bg-kirinji-black flex flex-col items-center justify-center px-6 gap-6">
      <div className="text-6xl opacity-30">🎫</div>
      <p className="text-white/50 text-sm text-center leading-relaxed">
        食券情報が見つかりませんでした。
        <br />
        トップページからやり直してください。
      </p>
      <Link
        href="/"
        className="bg-kirinji-yellow text-kirinji-black font-black px-8 py-3 rounded-full text-sm tracking-wider"
        style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
      >
        トップに戻る
      </Link>
    </div>
  );
}

export default function CompletePage() {
  const [ticket, setTicket] = useState<Ticket | null | undefined>(undefined);

  useEffect(() => {
    const raw = sessionStorage.getItem("kirinji-ticket");
    setTicket(raw ? (JSON.parse(raw) as Ticket) : null);
  }, []);

  if (ticket === undefined) {
    return (
      <div className="min-h-screen bg-kirinji-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-kirinji-yellow/30 border-t-kirinji-yellow rounded-full animate-spin" />
      </div>
    );
  }

  return ticket ? <TicketView ticket={ticket} /> : <NoTicketView />;
}
