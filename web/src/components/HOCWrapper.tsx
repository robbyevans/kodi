import React, { useEffect, useState } from "react";
import LandingPage from "./LoadingPage/LandingPage";
import ToastMessage from "./Toast/ToastMessage";

import { useAppDispatch } from "../redux/hooks";
import { useAdmins } from "../redux/hooks/useAdmin";
import { useToast } from "../redux/hooks/useToast";
import { fetchAllProperties } from "../redux/slices/propertiesSlice";
import { fetchAllHouses } from "../redux/slices/houseSlice";
import { fetchAllTenants } from "../redux/slices/tenantsSlice";
import usePaymentNotifications from "../redux/hooks/usePaymentNotification";

interface HOCWrapperProps {
  children: React.ReactNode;
}

const HOCWrapper: React.FC<HOCWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAdmins();
  const { toastMessage, messageType, clearToastMessage } = useToast();

  usePaymentNotifications();

  useEffect(() => {
    const initializeApp = async () => {
      if (!isAuthenticated) return;

      try {
        await Promise.all([
          dispatch(fetchAllProperties()).unwrap(),
          dispatch(fetchAllHouses()).unwrap(),
          dispatch(fetchAllTenants()).unwrap(),
        ]);
      } catch (err) {
        console.error("App initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, [dispatch, isAuthenticated]);

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
