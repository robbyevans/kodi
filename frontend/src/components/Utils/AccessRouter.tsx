import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../redux/hooks/useAdmin"; // Access authentication state and role

interface AccessRouterProps {
  children: React.ReactNode;
}

const AccessRouter: React.FC<AccessRouterProps> = ({ children }) => {
  const { isAuthenticated, role } = useAdmins(); // Get authentication status and role
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is logged out, redirect them to the login page
    if (!isAuthenticated) {
      navigate("/admin-login");
    } else if (role === "admin") {
      // If the user is an admin, stay on the current page
      console.log("this is causing the error");
      navigate("/admin-dashboard");
    } else if (role === "systemAdmin") {
      // If the user is a system admin, navigate to system admin page
      navigate("/system-admin");
    }
  }, [isAuthenticated, role]);

  return <>{children}</>;
};

export default AccessRouter;
