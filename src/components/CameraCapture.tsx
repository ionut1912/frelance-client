import { Box, Button, CircularProgress } from "@mui/material";
import { useCamera } from "../hooks/useCamera";
import { useCameraAvailability } from "../hooks/useCameraAvailability";
import RemoteCaptureFallback from "./RemoteCaptureFallback";
import { UserData } from "../models/UserProfile";
import { useCallback } from "react";
import { useRemotePhotoReceiver } from "../hooks/useRemotePhotoReceiver";

interface CameraCaptureProps {
  userData: UserData;
  onChange: (field: keyof UserData, value: string | null) => void;
}

export default function CameraCapture({
  userData,
  onChange,
}: CameraCaptureProps) {
  const {
    videoRef,
    canvasRef,
    streaming,
    startCamera,
    stopCamera,
    capturePhoto,
  } = useCamera();
  const { checking, hasCamera } = useCameraAvailability();

  const onPhotoCb = useCallback(
    (dataUrl: string) => {
      onChange("image", String(dataUrl));
    },
    [onChange],
  );

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session") || "";
  useRemotePhotoReceiver(sessionId, onPhotoCb);

  const handleCapture = () => {
    const photo = capturePhoto();
    if (photo) onChange("image", String(photo));
  };

  if (checking) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      {hasCamera ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{ maxWidth: "100%", borderRadius: 8, marginBottom: 8 }}
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          {!streaming ? (
            <Button variant="contained" onClick={startCamera} sx={{ mb: 1 }}>
              Start Camera
            </Button>
          ) : (
            <Box display="flex" gap={1}>
              <Button variant="contained" onClick={handleCapture}>
                Capture
              </Button>
              <Button variant="outlined" onClick={stopCamera}>
                Stop
              </Button>
            </Box>
          )}
        </>
      ) : (
        <RemoteCaptureFallback onPhoto={(photo) => onPhotoCb(String(photo))} />
      )}
      {userData.image && (
        <img
          src={userData.image}
          alt="Captured"
          style={{ marginTop: 8, maxWidth: 300, borderRadius: 8 }}
        />
      )}
    </Box>
  );
}
