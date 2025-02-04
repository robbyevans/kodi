import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth/Auth";
import AdminDashboardPage from "../components/Dashboard/Dashboard";
import PropertyContainer from "../containers/PropertyContainer";
import TenantsPage from "../components/TenantPage/TenantPage";
import SystemAdminPage from "../components/SystemAdminPage/SystemAdminPage";
import { useAdmins } from "../redux/hooks/useAdmin";
import AccessRouter from "./Utils/AccessRouter";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import SettingsPage from "../components/SettingsPage/SettingsPage";

const AppRouter = () => {
  const { isAuthenticated } = useAdmins();

  return (
    <>
      {/* Conditionally render Navbar based on authentication status */}
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* Login Page (always accessible if not authenticated) */}
        <Route
          path="/auth"
          element={
            <AccessRouter>
              <Auth />
            </AccessRouter>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <AccessRouter>
              <AdminDashboardPage />
            </AccessRouter>
          }
        />
        <Route
          path="/system-admin"
          element={
            <AccessRouter>
              <SystemAdminPage />
            </AccessRouter>
          }
        />
        <Route
          path="/property/:propertyId"
          element={
            <AccessRouter>
              <PropertyContainer />
            </AccessRouter>
          }
        />
        <Route
          path="/tenants"
          element={
            <AccessRouter>
              <TenantsPage />
            </AccessRouter>
          }
        />
        <Route
          path="/settings"
          element={
            <AccessRouter>
              <SettingsPage />
            </AccessRouter>
          }
        />

        {/* Default Route: Redirect to login if not authenticated */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRouter;
