import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLoginPage from "../components/Auth/AdminLogin";
import AdminDashboardPage from "../components/Dashboard/Dashboard";
import PropertyPage from "../components/PropertyPage/PropertyPage";
import TenantsPage from "../components/TenantPage/TenantPage";
import SystemAdminPage from "../components/SystemAdminPage/SystemAdminPage";
import { useAdmins } from "../redux/hooks/useAdmin"; // Access authentication state and role

const AppRouter = () => {
  const { isAuthenticated, role } = useAdmins(); // Get authentication status and role

  // Handle redirection based on authentication and role
  const getRedirectRoute = () => {
    if (!isAuthenticated) {
      return "/admin-login"; // Redirect to login page if not authenticated
    } else if (role === "admin") {
      return "/admin-dashboard"; // Redirect to admin dashboard
    } else if (role === "systemAdmin") {
      return "/system-admin"; // Redirect to system admin page
    }
    return "/admin-login"; // Default fallback to login if role is unknown
  };

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* Protected Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/system-admin" element={<SystemAdminPage />} />
        <Route path="/property/:propertyId" element={<PropertyPage />} />
        <Route path="/tenants" element={<TenantsPage />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to={getRedirectRoute()} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
