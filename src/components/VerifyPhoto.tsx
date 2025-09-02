import React, { useRef, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { verifyCapturedFace } from "../store/face-verification/thunks";
import { ClientProfileDto, FreelancerProfileDto } from "../models/UserProfile";
import { useNavigate } from "react-router-dom";

interface CameraCaptureProps {
  profile: ClientProfileDto | FreelancerProfileDto;
}

export default function CameraCapture({ profile }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [streaming, setStreaming] = useState<boolean>(false);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const startCamera = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreaming(true);
      }
    } catch (err) {
      console.error("Error accessing webcam: ", err);
    }
  };

  const capturePhoto = (): void => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (!context) return;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image: string = canvas.toDataURL("image/png");
      setPhotoBase64(base64Image);
    }
  };

  const stopCamera = (): void => {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
    }
    setStreaming(false);
  };

  const verifyPhoto = (): void => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
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
              <Button
                variant="contained"
                color="success"
                onClick={startCamera}
                className="px-6 py-2 rounded-xl"
              >
                Start Camera
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={capturePhoto}
                  className="px-6 py-2 rounded-xl"
                >
                  Capture
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={stopCamera}
                  className="px-6 py-2 rounded-xl"
                >
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
                onClick={verifyPhoto}
                className="px-6 py-2 rounded-xl"
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
