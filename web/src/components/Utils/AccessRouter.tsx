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
  const { pathname } = useLocation();

  useEffect(() => {
    // If the route is not public and the user is not authenticated,
    // redirect to /auth if not already there.
    if (!publicRoute && !isAuthenticated && pathname !== "/auth") {
      navigate("/auth");
    }
    // If the user is authenticated and tries to access public pages "/auth" or "/quiz",
    // redirect them to /dashboard.
    if (isAuthenticated && ["/auth", "/quiz"].includes(pathname)) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, publicRoute, navigate, pathname]);

  return <>{children}</>;
};

export default AccessRouter;
