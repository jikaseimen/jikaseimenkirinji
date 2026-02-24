"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { CartItem } from "@/lib/menu";

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD"; item: Omit<CartItem, "quantity"> }
  | { type: "REMOVE"; name: string }
  | { type: "UPDATE_QTY"; name: string; quantity: number }
  | { type: "CLEAR" };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  total: number;
  totalItems: number;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.name === action.item.name);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.name === action.item.name
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...action.item, quantity: 1 }] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.name !== action.name) };
    case "UPDATE_QTY": {
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.name !== action.name) };
      }
      return {
        items: state.items.map((i) =>
          i.name === action.name ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const total = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, total, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
