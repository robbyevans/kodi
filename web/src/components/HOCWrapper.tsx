import React, { useEffect, useState, ReactElement } from "react";
import LandingPage from "./LoadingPage/LandingPage";
import ToastMessage from "./Toast/ToastMessage";
import OfflinePage from "./OfflinePage/OfflinePage";
import * as S from "../styles/styles";
import { useAppDispatch } from "../redux/hooks";
import { useAdmins } from "../redux/hooks/useAdmin";
import { useToast } from "../redux/hooks/useToast";
import { fetchAllProperties } from "../redux/slices/propertiesSlice";
import { fetchAllHouses } from "../redux/slices/houseSlice";
import { fetchAllTenants } from "../redux/slices/tenantsSlice";
import usePaymentNotifications from "../redux/hooks/usePaymentNotification";
import { usePWAUpdateNotifier } from "../redux/hooks/usePWAUpdates";
import { requestFirebaseNotificationPermission } from "../firebase";

interface Props {
  children: ReactElement;
}

const HOCWrapper: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAdmins();
  const { toastMessage, messageType, clearToastMessage } = useToast();
  const { updateAvailable, refreshApp } = usePWAUpdateNotifier();

  // kick off payment notifications hook
  usePaymentNotifications();

  // track online/offline status
  useEffect(() => {
    const update = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  // fetch data & request notification permission when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    dispatch(fetchAllProperties());
    dispatch(fetchAllHouses());
    dispatch(fetchAllTenants());

    if (user?.admin_id) {
      requestFirebaseNotificationPermission(dispatch, user.admin_id)
        .then((token) => {
          if (!token) console.warn("No notification token returned");
        })
        .catch((err) => console.error("Notification permission error:", err));
    }
  }, [dispatch, isAuthenticated, user?.admin_id]);

  // simple loading timeout
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // early returns instead of nested ternary
  if (!isOnline) return <OfflinePage />;
  if (loading) return <LandingPage />;

  return (
    <>
      {updateAvailable && (
        <S.UpdateBanner>
          🔄 New version available.
          <S.RefreshButton onClick={refreshApp}>Refresh</S.RefreshButton>
        </S.UpdateBanner>
      )}

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
