"use client";

import { useRef, useState } from "react";
import { MENU_DATA } from "@/lib/menu";
import MenuCard from "./MenuCard";

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* Sticky tabs */}
      <div className="sticky top-[72px] z-40 bg-kirinji-black/95 backdrop-blur-sm border-b border-white/5">
        <div className="flex overflow-x-auto scrollbar-hide px-2 py-0 gap-0">
          {MENU_DATA.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => handleTabClick(idx)}
              className={`shrink-0 px-3 py-3 text-xs font-bold tracking-wide whitespace-nowrap transition-colors ${
                activeTab === idx
                  ? "text-kirinji-yellow border-b-2 border-kirinji-yellow"
                  : "text-white/50 border-b-2 border-transparent"
              }`}
              style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu sections */}
      <div className="px-4 pb-40">
        {MENU_DATA.map((cat, idx) => (
          <div
            key={cat.category}
            ref={(el) => { sectionRefs.current[idx] = el; }}
            className="pt-6"
          >
            {/* Section header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-kirinji-yellow rounded-full" />
              <h2
                className="text-white font-black text-lg tracking-wide"
                style={{ fontFamily: "'Bebas Neue', serif", letterSpacing: "0.1em" }}
              >
                {cat.category}
              </h2>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Items grid */}
            <div className="flex flex-col gap-2">
              {cat.items.map((item) => (
                <MenuCard
                  key={item.name}
                  name={item.name}
                  price={item.price}
                  category={cat.category}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
