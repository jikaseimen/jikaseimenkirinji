"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { CartItem } from "@/lib/menu";

type CartState = {
  items: CartItem[];
  insertedAmount: number;
};

type CartAction =
  | { type: "INSERT_MONEY"; amount: number }
  | { type: "RETURN_CHANGE" }
  | { type: "BUY"; item: Omit<CartItem, "quantity"> }
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
    case "INSERT_MONEY":
      return { ...state, insertedAmount: state.insertedAmount + action.amount };
    case "RETURN_CHANGE":
      return { ...state, insertedAmount: 0 };
    case "BUY": {
      if (state.insertedAmount < action.item.price) return state;
      const insertedAmount = state.insertedAmount - action.item.price;
      const existing = state.items.find((i) => i.name === action.item.name);
      if (existing) {
        return {
          insertedAmount,
          items: state.items.map((i) =>
            i.name === action.item.name ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { insertedAmount, items: [...state.items, { ...action.item, quantity: 1 }] };
    }
    case "REMOVE": {
      const removed = state.items.find((i) => i.name === action.name);
      const refund = removed ? removed.price * removed.quantity : 0;
      return {
        insertedAmount: state.insertedAmount + refund,
        items: state.items.filter((i) => i.name !== action.name),
      };
    }
    case "UPDATE_QTY": {
      const target = state.items.find((i) => i.name === action.name);
      if (!target) return state;
      if (action.quantity <= 0) {
        return {
          insertedAmount: state.insertedAmount + target.price * target.quantity,
          items: state.items.filter((i) => i.name !== action.name),
        };
      }
      const diff = action.quantity - target.quantity;
      // diff > 0 (increase) spends money and must be affordable; diff < 0 (decrease) refunds
      if (diff > 0 && state.insertedAmount < diff * target.price) return state;
      return {
        insertedAmount: state.insertedAmount - diff * target.price,
        items: state.items.map((i) =>
          i.name === action.name ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case "CLEAR":
      return { items: [], insertedAmount: 0 };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], insertedAmount: 0 });
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
