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
  const isUserEnabledNotifications = user?.is_notifications_allowed;

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

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllProperties());
      dispatch(fetchAllHouses());
      dispatch(fetchAllTenants());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const alreadyRequested = localStorage.getItem("notification_permission");

    if (
      isAuthenticated &&
      user?.admin_id &&
      !isUserEnabledNotifications &&
      !alreadyRequested
    ) {
      requestFirebaseNotificationPermission(dispatch, user.admin_id);
    }
  }, [isAuthenticated, isUserEnabledNotifications, user?.admin_id, dispatch]);

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

  if (loading) return <LandingPage />;

  return (
    <>
      {!isOnline && <OfflinePage />}
      <ToastMessage
        message={toastMessage}
        type={messageType}
        clearToastMessage={clearToastMessage}
      />
      {children}
    </>
  );
};

export default HOCWrapper;
