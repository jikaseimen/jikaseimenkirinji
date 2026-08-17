import { CartItem } from "@/lib/menu";

export function generateTicketNumber(): string {
  const now = new Date();
  const mmdd = String(now.getMonth() + 1).padStart(2, "0") + String(now.getDate()).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 900) + 100);
  return `T${mmdd}${seq}`;
}

export function calcPickupTime(fromMs: number): string {
  const d = new Date(fromMs + 15 * 60 * 1000);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export type Ticket = {
  ticketNumber: string;
  items: CartItem[];
  total: number;
  isTakeout: boolean;
  issuedAt: number;
};
