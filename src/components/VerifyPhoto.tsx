import { Card, CardContent, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { verifyCapturedFace } from "../store/face-verification/thunks";
import { ClientProfileDto, FreelancerProfileDto } from "../models/UserProfile";
import { useCamera } from "../hooks/useCamera";
import { useState } from "react";

interface VerifyPhotoProps {
  profile: ClientProfileDto | FreelancerProfileDto;
}

export default function VerifyPhoto({ profile }: VerifyPhotoProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    videoRef,
    canvasRef,
    streaming,
    startCamera,
    stopCamera,
    capturePhoto,
  } = useCamera();
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);

  const handleCapture = () => {
    const photo = capturePhoto();
    if (photo) setPhotoBase64(photo);
  };

  const handleVerify = () => {
    if (!photoBase64) return;
    dispatch(
      verifyCapturedFace({
        faceVerificationRequest: { faceBase64Image: photoBase64 },
        profile,
        navigate,
      }),
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <Card className="w-full max-w-lg shadow-xl rounded-2xl">
        <CardContent className="flex flex-col items-center gap-4">
          <Typography variant="h5" className="font-bold text-gray-700">
            Camera Verification
          </Typography>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="rounded-xl shadow-md max-w-full border border-gray-200"
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <div className="flex gap-3 mt-4">
            {!streaming ? (
              <Button variant="contained" color="success" onClick={startCamera}>
                Start Camera
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCapture}
                >
                  Capture
                </Button>
                <Button variant="outlined" color="error" onClick={stopCamera}>
                  Stop
                </Button>
              </>
            )}
          </div>
          {photoBase64 && (
            <div className="w-full mt-6 flex flex-col items-center">
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 mb-2"
              >
                Preview
              </Typography>
              <img
                src={photoBase64}
                alt="Captured"
                className="rounded-xl shadow-md mb-4 max-w-sm border border-gray-200"
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleVerify}
              >
                Verify Photo
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
