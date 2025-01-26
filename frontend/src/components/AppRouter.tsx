import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLoginPage from "../components/Auth/AdminLogin";
import AdminDashboardPage from "../components/Dashboard/Dashboard";
import HousesPage from "../components/HousePage/HousePage";
import PropertiesPage from "../components/PropertyPage/PropertyPage";
import TenantsPage from "../components/TenantPage/TenantPage";
import { useAdmins } from "../redux/hooks/useAdmin"; // Assuming this is where isAuthenticated comes from

const AppRouter = () => {
  const { isAuthenticated } = useAdmins(); // Accessing the authentication state

  return (
    <Router>
      <Routes>
        {/* If authenticated, go to dashboard, else go to login */}
        <Route
          path="/"
          element={
            isAuthenticated ? <AdminDashboardPage /> : <AdminLoginPage />
          }
        />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/houses" element={<HousesPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/tenants" element={<TenantsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
