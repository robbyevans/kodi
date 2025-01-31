// File 2: /frontend/src/components/Utils/AccessRouter.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../redux/hooks/useAdmin"; // Access authentication state and role

interface AccessRouterProps {
  children: React.ReactNode;
}

const AccessRouter: React.FC<AccessRouterProps> = ({ children }) => {
  const { isAuthenticated } = useAdmins(); // Get authentication status and role

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin-login");
    }
  }, [isAuthenticated, navigate]);

  return <>{children}</>;
};

export default AccessRouter;
