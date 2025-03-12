import React, { useState, useEffect } from "react";
import LandingPage from "./LoadingPage/LandingPage";
import { useAppDispatch } from "../redux/hooks";
import { useAdmins } from "../redux/hooks/useAdmin";
import { useToast } from "../redux/hooks/useToast";
import { fetchAllProperties } from "../redux/slices/propertiesSlice";
import { fetchAllHouses } from "../redux/slices/houseSlice";
import { fetchAllTenants } from "../redux/slices/tenantsSlice";
import ToastMessage from "./Toast/ToastMessage";

const HOCWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAdmins();
  const { toastMessage, messageType, clearToastMessage } = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllProperties());
      dispatch(fetchAllHouses());
      dispatch(fetchAllTenants());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 8000);
    return () => clearTimeout(timer);
  }, []);

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
