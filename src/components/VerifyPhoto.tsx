import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { verifyCapturedFace } from "../store/face-verification/thunks";
import { ClientProfileDto, FreelancerProfileDto } from "../models/UserProfile";
import { useCamera } from "../hooks/useCamera";
import { useCameraAvailability } from "../hooks/useCameraAvailability";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import RemoteCaptureFallback from "./RemoteCaptureFallback";
import { useRemotePhotoReceiver } from "../hooks/useRemotePhotoReceiver";

interface VerifyPhotoProps {
  profile: ClientProfileDto | FreelancerProfileDto;
}

type PhotoSource = "local" | "remote" | null;

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
  const { checking, hasCamera } = useCameraAvailability();

  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [photoSource, setPhotoSource] = useState<PhotoSource>(null);
  const [snackOpen, setSnackOpen] = useState(false);

  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const sessionId = params.get("session") || "";

  const onPhotoCb = useCallback((dataUrl: string) => {
    if (typeof dataUrl === "string" && dataUrl.startsWith("data:image")) {
      setPhotoBase64(dataUrl);
      setPhotoSource("remote");
      setSnackOpen(true);
    }
  }, []);

  useRemotePhotoReceiver(sessionId, onPhotoCb);

  const handleCapture = () => {
    const photo = capturePhoto();
    if (photo) {
      setPhotoBase64(photo);
      setPhotoSource("local");
      setSnackOpen(true);
    }
  };

  useEffect(() => {
    if (photoBase64 && streaming) {
      stopCamera();
    }
  }, [photoBase64, streaming, stopCamera]);

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

  const handleRetake = () => {
    setPhotoBase64(null);
    setPhotoSource(null);
    if (hasCamera && !streaming) {
      startCamera();
    }
  };

  if (checking) {
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <Card className="w-full max-w-lg shadow-xl rounded-2xl">
        <CardContent className="flex flex-col items-center gap-4">
          <Typography variant="h5" className="font-bold text-gray-700">
            Camera Verification
          </Typography>

          {hasCamera ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="rounded-xl shadow-md max-w-full border border-gray-200"
                style={{ maxHeight: 360 }}
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />

              <div className="flex gap-3 mt-4">
                {!streaming ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={startCamera}
                  >
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
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={stopCamera}
                    >
                      Stop
                    </Button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="w-full mt-2">
              <Typography
                variant="subtitle1"
                className="text-gray-600 mb-2 text-center"
              >
                No local camera detected. You can capture a photo from another
                device:
              </Typography>
              <RemoteCaptureFallback onPhoto={onPhotoCb} />
            </div>
          )}

          {photoBase64 && (
            <div className="w-full mt-6 flex flex-col items-center">
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 mb-2"
              >
                Preview {photoSource ? `(${photoSource})` : ""}
              </Typography>
              <img
                src={photoBase64}
                alt="Captured"
                className="rounded-xl shadow-md mb-4 max-w-sm border border-gray-200"
                style={{ objectFit: "cover", maxHeight: 360 }}
              />
              <div className="flex gap-3">
                <Button variant="outlined" onClick={handleRetake}>
                  Retake
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleVerify}
                >
                  Verify Photo
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        message={
          photoSource === "remote"
            ? "Photo received from mobile"
            : "Photo captured"
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
}
