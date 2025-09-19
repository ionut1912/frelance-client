import { useEffect } from "react";
import { createHubConnection } from "../lib/signalr";

const API_BASE = process.env.REACT_APP_API_BASE || "";

export function useRemotePhotoReceiver(
  sessionId: string,
  onPhoto: (dataUrl: string) => void,
) {
  useEffect(() => {
    if (!sessionId) return;

    const conn = createHubConnection(API_BASE);
    let mounted = true;

    (async () => {
      try {
        await conn.start();
        await conn.invoke("Join", sessionId);
        conn.on("PhotoDataUrl", (sid: string, dataUrl: string) => {
          if (!mounted) return;
          if (!sid || sid === sessionId) onPhoto(dataUrl);
        });
        conn.on("SendPhotoDataUrl", (sid: string, dataUrl: string) => {
          if (!mounted) return;
          if (!sid || sid === sessionId) onPhoto(dataUrl);
        });
        conn.on("Photo", (dataUrl: string) => {
          if (!mounted) return;
          onPhoto(dataUrl);
        });
        conn.onreconnected?.(() => conn.invoke("Join", sessionId));
      } catch (e) {
        console.error("SignalR connect error:", e);
      }
    })();

    return () => {
      mounted = false;
      conn.stop();
    };
  }, [sessionId, onPhoto]);
}
