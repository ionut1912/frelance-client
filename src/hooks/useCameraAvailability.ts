import { useEffect, useState } from "react";

export function useCameraAvailability() {
  const [checking, setChecking] = useState(true);
  const [hasCamera, setHasCamera] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!navigator.mediaDevices?.enumerateDevices) {
          setHasCamera(false);
          return;
        }
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cams = devices.filter((d) => d.kind === "videoinput");
        if (!cancelled) setHasCamera(cams.length > 0);
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { checking, hasCamera };
}
