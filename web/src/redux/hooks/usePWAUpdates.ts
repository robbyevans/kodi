import { useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";

export function usePWAUpdateNotifier() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    registerSW({
      onNeedRefresh() {
        setUpdateAvailable(true);
      },
      onOfflineReady() {
        console.log("PWA ready for offline use.");
      },
    });

    return () => {
      // Optional cleanup if needed
    };
  }, []);

  const refreshApp = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return { updateAvailable, refreshApp };
}
