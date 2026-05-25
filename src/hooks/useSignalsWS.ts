"use client";

import { useEffect } from "react";

export function useSignalsWS(onUpdate: (u: any) => void) {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      onUpdate(data);
    };

    return () => ws.close();
  }, []);
}
