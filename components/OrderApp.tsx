"use client";

import { useState } from "react";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import MenuSection from "@/components/MenuSection";
import CartPanel from "@/components/CartPanel";
import FloatingCartBar from "@/components/FloatingCartBar";

export default function OrderApp() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="relative">
        <Header onCartClick={() => setCartOpen(true)} />
        
        {/* Hero strip */}
        <div className="bg-kirinji-yellow px-4 py-2 flex items-center gap-3">
          <div className="flex gap-1">
            {["●", "●", "●"].map((d, i) => (
              <span key={i} className="text-kirinji-black text-[8px]">{d}</span>
            ))}
          </div>
          <p className="text-kirinji-black font-black text-xs tracking-widest uppercase flex-1 text-center">
            Mobile Order — カスラーメン自家製麺キリンジ
          </p>
          <div className="flex gap-1">
            {["●", "●", "●"].map((d, i) => (
              <span key={i} className="text-kirinji-black text-[8px]">{d}</span>
            ))}
          </div>
        </div>

        <MenuSection />
        <FloatingCartBar onCartClick={() => setCartOpen(true)} />
        <CartPanel isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </CartProvider>
  );
}
