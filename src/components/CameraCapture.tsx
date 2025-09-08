import { Box, Button } from "@mui/material";
import { useCamera } from "../hooks/useCamera";
import { UserData } from "../models/UserProfile";

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

  const handleCapture = () => {
    const photo = capturePhoto();
    if (photo) onChange("image", photo);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
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
        <Box display="flex" gap={1}>
          <Button variant="contained" onClick={handleCapture}>
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
  );
}
