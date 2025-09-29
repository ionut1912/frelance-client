import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { createHubConnection } from "../lib/signalr";

const API_BASE = process.env.REACT_APP_API_BASE || "";

const MAX_BASE64_CHARS = 40_000;
const TARGET_W = 640;
const INITIAL_QUALITY = 0.6;

async function getFrontCameraStream(): Promise<MediaStream> {
  try {
    return await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { exact: "user" },
        width: { ideal: TARGET_W },
        height: { ideal: 480 },
      },
      audio: false,
    });
  } catch {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoInputs = devices.filter((d) => d.kind === "videoinput");
    const front =
      videoInputs.find((d) => /front|facetime|user/i.test(d.label || "")) ||
      videoInputs[0];
    if (!front) throw new Error("Nu am găsit cameră video pe acest device.");
    return await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: front.deviceId } },
      audio: false,
    });
  }
}

export default function MobileCapturePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);
  const [sending, setSending] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session") || "";

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const stream = await getFrontCameraStream();
        if (!active) return;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setReady(true);
        }
      } catch (e) {
        alert((e as Error).message);
      }
    })();
    return () => {
      active = false;
      const s = videoRef.current?.srcObject as MediaStream | null;
      s?.getTracks().forEach((t) => t.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, []);

  const drawScaled = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return false;
    const scale = Math.min(TARGET_W / Math.max(vw, vh), 1);
    const cw = Math.round(vw * scale);
    const ch = Math.round(vh * scale);

    canvas.width = cw;
    canvas.height = ch;

    const ctx = canvas.getContext("2d");
    if (!ctx) return false;
    ctx.drawImage(video, 0, 0, cw, ch);
    return true;
  };

  const canvasToSizedDataUrl = (
    canvas: HTMLCanvasElement,
    maxChars = MAX_BASE64_CHARS,
  ) => {
    let q = INITIAL_QUALITY;
    let dataUrl = canvas.toDataURL("image/jpeg", q);
    while (dataUrl.length > maxChars && q > 0.3) {
      q -= 0.1;
      dataUrl = canvas.toDataURL("image/jpeg", q);
    }
    return { dataUrl, q };
  };

  const captureAndSend = async () => {
    if (!sessionId) {
      alert("Lipsește sessionId");
      return;
    }
    const video = videoRef.current,
      canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ok = drawScaled(video, canvas);
    if (!ok) {
      alert("Camera nu e gata încă. Încearcă din nou.");
      return;
    }

    setSending(true);
    try {
      const { dataUrl, q } = canvasToSizedDataUrl(canvas);
      if (dataUrl.length > MAX_BASE64_CHARS) {
        setSending(false);
        alert(
          "Imaginea e prea mare pentru setările serverului. " +
            "Reduce calitatea/rezoluția sau mărește limita de mesaj pe server (SignalR).",
        );
        return;
      }

      const conn = createHubConnection(API_BASE);
      await conn.start();
      await conn.invoke("Join", sessionId);
      await conn.invoke("SendPhotoDataUrl", sessionId, dataUrl);
      await conn.stop();

      alert(`Foto trimisă (q=${q.toFixed(1)}). Revino pe desktop.`);
    } catch (e) {
      alert(`Eroare la trimitere: ${(e as Error).message}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <Box p={2} display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">Captură foto (telefon)</Typography>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "100%", borderRadius: 8 }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <Button
        variant="contained"
        disabled={!ready || sending}
        onClick={captureAndSend}
      >
        {sending ? "Se trimite…" : "Capture & Trimite"}
      </Button>
    </Box>
  );
}
