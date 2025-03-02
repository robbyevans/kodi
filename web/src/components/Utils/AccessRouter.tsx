// File: /web/src/components/Utils/AccessRouter.tsx

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdmins } from "../../redux/hooks/useAdmin";

interface AccessRouterProps {
  children: React.ReactNode;
  publicRoute?: boolean;
}

const AccessRouter: React.FC<AccessRouterProps> = ({
  children,
  publicRoute = false,
}) => {
  const { isAuthenticated } = useAdmins();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";
  const isQuizPage = location.pathname === "/quiz";

  useEffect(() => {
    // If the route is not public and the user is not authenticated, redirect to /auth.
    if (!publicRoute && !isAuthenticated) {
      navigate("/auth");
    }
    // Additionally, if the user is authenticated and they try to access /auth, redirect them to dashboard.
    if (isAuthenticated && (isAuthPage || isQuizPage)) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, publicRoute, navigate, location]);

  return <>{children}</>;
};

export default AccessRouter;
