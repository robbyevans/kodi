import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import AuthContainer from "../containers/AuthContainer";
import PropertyContainer from "../containers/PropertyContainer";
import { useAdmins } from "../redux/hooks/useAdmin";
import AccessRouter from "../components/Utils/AccessRouter";
import DashboardContainer from "../containers/dashboardContainer";
import SettingsPageContainer from "../containers/settingsContainer";
import AnalyticsContainer from "../containers/AnalyticsContainer";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import QuizPage from "../components/QuizPage/QuizPage";
import FooterMobile from "../components/FooterMobile/FooterMobile";
import PaymentContainer from "../containers/paymentContainer";
import PasswordResetPageContainer from "../containers/PasswordResetPageContainer";
import * as S from "./styles";
import TenantNotificationsPage from "../components/TenantNotification/TenantNotification";

const AppRouter = () => {
  const { isAuthenticated } = useAdmins();
  const location = useLocation();
  const bodyWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyWrapperRef.current) {
      bodyWrapperRef.current.scrollTop = 0;
    }
  }, [location]);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <S.AppWrapper data-testid="app-wrapper">
        {isAuthenticated && <Sidebar />}
        <S.BodyWrapper
          data-testid="body-wrapper"
          $isAuthPage={!isAuthenticated}
          ref={bodyWrapperRef}
        >
          <Routes>
            <Route
              path="/auth"
              element={
                <AccessRouter>
                  <AuthContainer />
                </AccessRouter>
              }
            />

            <Route
              path="/quiz"
              element={
                <AccessRouter publicRoute>
                  <QuizPage />
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
              path="/analytics"
              element={
                <AccessRouter>
                  <AnalyticsContainer />
                </AccessRouter>
              }
            />
            <Route
              path="/payments"
              element={
                <AccessRouter>
                  <PaymentContainer />
                </AccessRouter>
              }
            />

            <Route
              path="/tenant-notifications"
              element={<TenantNotificationsPage />}
            />

            <Route
              path="/password-reset"
              element={<PasswordResetPageContainer />}
            />

            <Route
              path="/"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/auth"} />
              }
            />
          </Routes>
          {isAuthenticated && <FooterMobile />}
          {isAuthenticated && <Footer />}
        </S.BodyWrapper>
      </S.AppWrapper>
    </>
  );
};

export default AppRouter;
