import React, { useEffect, useState, ReactElement } from "react";
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

import { requestFirebaseNotificationPermission } from "../firebase";
import PullToRefreshWrapper from "./PullToRefreshWrapper/PullToRefreshWrapper";

interface HOCWrapperProps {
  children: ReactElement;
}

const HOCWrapper: React.FC<HOCWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAdmins();
  const { toastMessage, messageType, clearToastMessage } = useToast();
  const isUserEnabledNotifications = user?.is_notifications_allowed;

  usePaymentNotifications();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllProperties());
      dispatch(fetchAllHouses());
      dispatch(fetchAllTenants());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const alreadyRequested = localStorage.getItem("notification_permission");

    if (isAuthenticated && !isUserEnabledNotifications && !alreadyRequested) {
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
          localStorage.setItem("notification_permission", "true");
        }
      });
    }
  }, [isAuthenticated, isUserEnabledNotifications]);

  if (loading) return <LandingPage />;

  return (
    <>
      <ToastMessage
        message={toastMessage}
        type={messageType}
        clearToastMessage={clearToastMessage}
      />
      <PullToRefreshWrapper>
        <div>{children}</div>
      </PullToRefreshWrapper>
    </>
  );
};

export default HOCWrapper;
