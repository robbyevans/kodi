import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import PropertyContainer from "../containers/PropertyContainer";
import TenantsPage from "../components/TenantPage/TenantPage";
import SystemAdminPage from "../components/SystemAdminPage/SystemAdminPage";
import { useAdmins } from "../redux/hooks/useAdmin";
import AccessRouter from "../components/Utils/AccessRouter";
import DashboardContainer from "../containers/dashboardContainer";

import SettingsPage from "../components/SettingsPage/SettingsPage";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import * as S from "./styles";

const AppRouter = () => {
  const { isAuthenticated } = useAdmins();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <S.AppWrapper data-testid="app-wrapper">
        {isAuthenticated && <Sidebar />}
        <S.BodyWrapper
          data-testid="body-wrapper"
          $isAuthPage={!isAuthenticated}
        >
          <Routes>
            <Route
              path="/auth"
              element={
                <AccessRouter>
                  <Auth />
                </AccessRouter>
              }
            />

            <Route
              path="/dashboard"
              element={
                <AccessRouter>
                  <DashboardContainer />
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

            <Route
              path="/"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/auth"} />
              }
            />
          </Routes>
        </S.BodyWrapper>
      </S.AppWrapper>
      <Footer />
    </>
  );
};

export default AppRouter;
