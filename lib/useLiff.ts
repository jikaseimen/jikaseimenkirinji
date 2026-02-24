"use client";

import { useEffect, useState } from "react";

export type LiffStatus =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "ready"; inClient: boolean }
  | { state: "error"; message: string };

export function useLiff() {
  const [status, setStatus] = useState<LiffStatus>({ state: "idle" });

  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
    if (!liffId) {
      setStatus({ state: "error", message: "NEXT_PUBLIC_LIFF_ID が未設定です" });
      return;
    }

    setStatus({ state: "loading" });

    // @line/liff は ESM / dynamic import で読み込む
    import("@line/liff")
      .then(async ({ default: liff }) => {
        await liff.init({ liffId });
        setStatus({ state: "ready", inClient: liff.isInClient() });
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        setStatus({ state: "error", message: msg });
        console.error("[LIFF] init error:", err);
      });
  }, []);

  return status;
}
