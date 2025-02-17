import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Auth from "../components/Auth/Auth";
import PropertyContainer from "../containers/PropertyContainer";
import { useAdmins } from "../redux/hooks/useAdmin";
import AccessRouter from "../components/Utils/AccessRouter";
import DashboardContainer from "../containers/dashboardContainer";

import SettingsPageContainer from "../containers/settingsContainer";
import ProfileContainer from "../containers/profileContainer";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import * as S from "./styles";

const AppRouter = () => {
  const { isAuthenticated } = useAdmins();
  const location = useLocation(); // Get the current location

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // Only trigger when the location changes

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
              path="/property/:propertyId"
              element={
                <AccessRouter>
                  <PropertyContainer />
                </AccessRouter>
              }
            />
            <Route
              path="/settings"
              element={
                <AccessRouter>
                  <SettingsPageContainer />
                </AccessRouter>
              }
            />
            <Route
              path="/profile"
              element={
                <AccessRouter>
                  <ProfileContainer />
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
          {isAuthenticated && <Footer />}
        </S.BodyWrapper>
      </S.AppWrapper>
    </>
  );
};

export default AppRouter;
