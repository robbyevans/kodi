import React, { useEffect, useState, ReactElement } from "react";
import LandingPage from "./LoadingPage/LandingPage";
import ToastMessage from "./Toast/ToastMessage";
import OfflinePage from "./OfflinePage/OfflinePage";

import { useAppDispatch } from "../redux/hooks";
import { useAdmins } from "../redux/hooks/useAdmin";
import { useToast } from "../redux/hooks/useToast";
import { fetchAllProperties } from "../redux/slices/propertiesSlice";
import { fetchAllHouses } from "../redux/slices/houseSlice";
import { fetchAllTenants } from "../redux/slices/tenantsSlice";
import usePaymentNotifications from "../redux/hooks/usePaymentNotification";

import {
  requestFirebaseNotificationPermission,
  onMessageListener,
} from "../firebase";

interface HOCWrapperProps {
  children: ReactElement;
}

const HOCWrapper: React.FC<HOCWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAdmins();
  const { toastMessage, messageType, clearToastMessage } = useToast();

  usePaymentNotifications();

  // Handle connectivity status
  useEffect(() => {
    const handleOnline = () => {
      console.log("✅ Internet reconnected");
      setIsOnline(true);
    };
    const handleOffline = () => {
      console.log("⚠️ Lost internet connection");
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Fetch initial data if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllProperties());
      dispatch(fetchAllHouses());
      dispatch(fetchAllTenants());
    }
  }, [dispatch, isAuthenticated]);

  // Always show splash screen for at least 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Request Firebase notification permission if needed
  useEffect(() => {
    if (isAuthenticated && user?.admin_id && !user.device_token) {
      requestFirebaseNotificationPermission(dispatch, user.admin_id);
    }
  }, [isAuthenticated, user?.admin_id, user?.device_token, dispatch]);

  // Listen for incoming foreground messages
  useEffect(() => {
    onMessageListener().then((payload: any) => {
      console.log("📩 Foreground Notification Received:", payload);
      dispatch({
        type: "toast/showToast",
        payload: {
          message: payload.notification.body,
          type: "info",
        },
      });
    });
  }, [dispatch]);

  return (
    <>
      {/* Render always so redirection logic in children can run */}
      {!isOnline && <OfflinePage />}
      <ToastMessage
        message={toastMessage}
        type={messageType}
        clearToastMessage={clearToastMessage}
      />
      {children}

      {/* Overlay splash screen */}
      {loading && <LandingPage />}
    </>
  );
};

export default HOCWrapper;
