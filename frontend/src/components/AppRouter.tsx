import { Routes, Route, Navigate } from "react-router-dom";
import AdminLoginPage from "../components/Auth/AdminLogin";
import AdminDashboardPage from "../components/Dashboard/Dashboard";
import PropertyContainer from "../containers/PropertyContainer";
import TenantsPage from "../components/TenantPage/TenantPage";
import SystemAdminPage from "../components/SystemAdminPage/SystemAdminPage";
import { useAdmins } from "../redux/hooks/useAdmin";
import AccessRouter from "./Utils/AccessRouter";
import Navbar from "../components/Navbar/Navbar"; // Import Navbar

const AppRouter = () => {
  const { isAuthenticated } = useAdmins();

  return (
    <>
      {/* Conditionally render Navbar based on authentication status */}
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* Login Page (always accessible if not authenticated) */}
        <Route
          path="/admin-login"
          element={
            <AccessRouter>
              <AdminLoginPage />
            </AccessRouter>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/admin-dashboard"
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

        {/* Default Route: Redirect to login if not authenticated */}
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? "/admin-dashboard" : "/admin-login"}
            />
          }
        />
      </Routes>
    </>
  );
};

export default AppRouter;
