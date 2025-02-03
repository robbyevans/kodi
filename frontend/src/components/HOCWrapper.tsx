// File: /frontend/src/components/HOCWrapper.tsx
import React, { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage/LoadingPage";
import { useAppDispatch } from "../redux/hooks"; // Import the custom hook
import { useAdmins } from "../redux/hooks/useAdmin";
import { useToast } from "../redux/hooks/useToast";
import { fetchProperties } from "../redux/slices/propertiesSlice";
import ToastMessage from "./Toast/ToastMessage";

const HOCWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAdmins();
  const { toastMessage, messageType, clearToastMessage } = useToast();
  const dispatch = useAppDispatch(); // Use the custom hook

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProperties()); // This will now work without type errors
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <ToastMessage message={toastMessage} type={messageType} clearToastMessage={clearToastMessage}/>
      {children}
    </>
  );
};

export default HOCWrapper;
