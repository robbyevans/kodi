import React, { useEffect, useState } from "react";
import LandingPage from "./LoadingPage/LandingPage";
import ToastMessage from "./Toast/ToastMessage";

import { useAppDispatch } from "../redux/hooks";
import { useAdmins } from "../redux/hooks/useAdmin";
import { useToast } from "../redux/hooks/useToast";
import { fetchAllProperties } from "../redux/slices/propertiesSlice";
import { fetchAllHouses } from "../redux/slices/houseSlice";
import { fetchAllTenants } from "../redux/slices/tenantsSlice";
import { editAdmin } from "../redux/slices/adminSlice";
import usePaymentNotifications from "../redux/hooks/usePaymentNotification";

// 👇 Import Firebase push setup
import { requestFirebaseNotificationPermission } from "../firebase";

interface HOCWrapperProps {
  children: React.ReactNode;
}

const HOCWrapper: React.FC<HOCWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAdmins();
  const { toastMessage, messageType, clearToastMessage } = useToast();
  const isUserEnabledNotifications = user?.is_notifications_allowed;

  usePaymentNotifications();

  // Fetch data when logged in
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllProperties());
      dispatch(fetchAllHouses());
      dispatch(fetchAllTenants());
    }
  }, [dispatch, isAuthenticated]);

  // ⏰ Loading splash
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // 🔔 Ask for notification permission once user is authenticated
  useEffect(() => {
    if (isAuthenticated && !isUserEnabledNotifications) {
      requestFirebaseNotificationPermission().then((token) => {
        if (token) {
          console.log("✅ Push Token received:", token);
          dispatch(
            editAdmin({
              adminId: user.admin_id!,
              data: {
                is_notifications_allowed: true,
              },
            })
          );
        } else {
          console.log("❌ Notification permission denied or failed.");
        }
      });
    }
  }, [isAuthenticated]);

  if (loading) {
    return <LandingPage />;
  }

  return (
    <>
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
