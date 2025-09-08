import { useRef, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

interface UserDataFormProps {
  userData: UserData;
  onChange: (field: keyof UserData, value: string | null) => void;
}

export interface UserData {
  bio: string;
  image: string | null;
}

export default function UserDataForm({
  userData,
  onChange,
}: UserDataFormProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [streaming, setStreaming] = useState(false);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      setStreaming(true);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
      onChange("image", canvasRef.current.toDataURL("image/png"));
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
    }
    setStreaming(false);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        label="Bio"
        value={userData.bio}
        onChange={(e) => onChange("bio", e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ maxWidth: "100%", borderRadius: 8, marginBottom: 8 }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        {!streaming ? (
          <Button variant="contained" onClick={startCamera} sx={{ mb: 1 }}>
            Start Camera
          </Button>
        ) : (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="contained" onClick={capturePhoto}>
              Capture
            </Button>
            <Button variant="outlined" onClick={stopCamera}>
              Stop
            </Button>
          </Box>
        )}
        {userData.image && (
          <img
            src={userData.image}
            alt="Captured"
            style={{ marginTop: 8, maxWidth: 300, borderRadius: 8 }}
          />
        )}
      </Box>
    </Box>
  );
}
