// File: /web/src/components/HOCWrapper.tsx
import React, { useEffect, useState, ReactElement } from "react";
import LandingPage from "./LoadingPage/LandingPage";
import ToastMessage from "./Toast/ToastMessage";
import OfflinePage from "./OfflinePage/OfflinePage";
import styled from "styled-components";

import { useAppDispatch } from "../redux/hooks";
import { useAdmins } from "../redux/hooks/useAdmin";
import { useToast } from "../redux/hooks/useToast";
import { fetchAllProperties } from "../redux/slices/propertiesSlice";
import { fetchAllHouses } from "../redux/slices/houseSlice";
import { fetchAllTenants } from "../redux/slices/tenantsSlice";
import usePaymentNotifications from "../redux/hooks/usePaymentNotification";
import { usePWAUpdateNotifier } from "../redux/hooks/usePWAUpdates";

import { requestFirebaseNotificationPermission } from "../firebase";
// import { onMessageListener } from "../firebase";

interface HOCWrapperProps {
  children: ReactElement;
}

const HOCWrapper: React.FC<HOCWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAdmins();
  const { toastMessage, messageType, clearToastMessage } = useToast();
  const { updateAvailable, refreshApp } = usePWAUpdateNotifier();

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

  // Request Firebase notification permission if needed.
  useEffect(() => {
    if (isAuthenticated && user?.admin_id) {
      console.log(
        `Requesting Firebase notification permission for admin_id: ${user.admin_id}`
      );
      requestFirebaseNotificationPermission(dispatch, user.admin_id)
        .then((token) => {
          if (token) {
            console.log(
              `✅ Successfully updated device_token for admin_id: ${user.admin_id}`
            );
          } else {
            console.warn(
              `⚠️ No device_token returned for admin_id: ${user.admin_id}`
            );
          }
        })
        .catch((err) => console.error("Error in notification request:", err));
    }
  }, [isAuthenticated, user?.admin_id, dispatch]);

  // Listen for incoming foreground messages
  // useEffect(() => {
  //   onMessageListener().then((payload: any) => {
  //     console.log("📩 Foreground Notification Received:", payload);
  //     dispatch({
  //       type: "toast/showToast",
  //       payload: {
  //         message: payload.notification.body,
  //         type: "info",
  //       },
  //     });
  //   });
  // }, [dispatch]);

  const UpdateBanner = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #222;
    color: #fff;
    text-align: center;
    padding: 12px;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    gap: 10px;
  `;

  const RefreshButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #45a049;
    }
  `;

  return (
    <>
      {loading ? (
        <LandingPage />
      ) : (
        <>
          {updateAvailable && (
            <UpdateBanner>
              🔄 New version available.
              <RefreshButton onClick={refreshApp}>Refresh</RefreshButton>
            </UpdateBanner>
          )}

          {!isOnline && <OfflinePage />}
          <ToastMessage
            message={toastMessage}
            type={messageType}
            clearToastMessage={clearToastMessage}
          />
          {children}
        </>
      )}
    </>
  );
};

export default HOCWrapper;
