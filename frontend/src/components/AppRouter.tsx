import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLoginPage from "../components/Auth/AdminLogin";
import AdminDashboardPage from "../components/Dashboard/Dashboard";
import HousesPage from "../components/HousePage/HousePage";
import PropertiesPage from "../components/PropertyPage/PropertyPage";
import TenantsPage from "../components/TenantPage/TenantPage";
import SystemAdminPage from "../components/SystemAdminPage/SystemAdminPage";
import { useAdmins } from "../redux/hooks/useAdmin"; // Access authentication state and role

const AppRouter = () => {
  const { isAuthenticated, role } = useAdmins(); // Get role and auth state

  const renderDashboard = () => {
    if (!isAuthenticated) return <Navigate to="/admin-login" />;
    return role === "systemAdmin" ? (
      <SystemAdminPage />
    ) : (
      <AdminDashboardPage />
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin-dashboard" element={renderDashboard()} />
        <Route path="/houses" element={<HousesPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/tenants" element={<TenantsPage />} />
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
