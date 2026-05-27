"use client";

import { useEffect } from "react";

export function useSignalsWS(onUpdate: (u: unknown) => void) {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (e: MessageEvent<string>) => {
      let data: unknown;
      try {
        data = JSON.parse(e.data);
      } catch (err) {
        // Keep parsing errors visible during development.
        // Use the caught error so the linter doesn't flag it as unused.
        console.warn("useSignalsWS: failed to parse message", err);
        data = undefined;
      }
      onUpdate(data);
    };

    return () => ws.close();
  }, [onUpdate]);
}
