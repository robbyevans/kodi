// File 2: /frontend/src/components/Utils/AccessRouter.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../redux/hooks/useAdmin"; // Access authentication state and role

interface AccessRouterProps {
  children: React.ReactNode;
}

const AccessRouter: React.FC<AccessRouterProps> = ({ children }) => {
  const { isAuthenticated, currentAdmin } = useAdmins(); // Get authentication status and role
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // If the user is not authenticated, redirect them to the login page
      navigate("/admin-login");
    } else if (currentAdmin?.role === "admin") {
      // Allow admin to access any page they are authorized to
      // No redirection needed for admin
    } else if (currentAdmin?.role === "systemAdmin") {
      // If the user is a system admin, navigate to the system admin page
      navigate("/system-admin");
    }
  }, [isAuthenticated, currentAdmin, navigate]);

  return <>{children}</>;
};

export default AccessRouter;
