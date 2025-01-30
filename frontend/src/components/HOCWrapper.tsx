import React, { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage/LoadingPage";

const HOCWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
};

export default HOCWrapper;
