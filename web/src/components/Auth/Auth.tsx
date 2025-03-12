import { useState, useEffect } from "react";
import { useAdmins } from "../../redux/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import dashboardImage from "../../assets/dashboard.png";
import * as S from "./styles";

const Auth = () => {
  const {
    loading,
    error,
    user,
    isAuthenticated,
    handleLogin,
    handleGoogleAuth,
  } = useAdmins();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  useEffect(() => {
    if (isAuthenticated && user.role === "admin") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, user.role, navigate]);

  const handleGoogleSuccess = (credentialResponse: any) => {
    const token = credentialResponse.credential;
    if (!token) {
      console.info("No token returned from Google");
      return;
    }
    handleGoogleAuth(token, "login");
  };

  const handleGoogleError = () => {
    console.info("Google login failed");
  };

  const handleGetStarted = () => {
    navigate("/quiz");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <S.SplitContainer>
        <S.LeftPane>
          <S.AuthContainer>
            <S.InfoTitle>
              Own your properties, not the hassle. Kodi does the rest.
            </S.InfoTitle>

            <S.GetStartedContainer>
              <S.GetStartedButton onClick={handleGetStarted}>
                GET STARTED
              </S.GetStartedButton>
              <S.GetStartedText>
                New to Kodi? Begin your journey and set up your property
                management experience.
              </S.GetStartedText>
            </S.GetStartedContainer>

            <S.Form onSubmit={handleSubmit}>
              <S.Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <S.Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
              <S.Button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Login"}
              </S.Button>
            </S.Form>

            <S.Divider>OR</S.Divider>

            <S.GoogleContainer>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signin_with"
                shape="pill"
                size="large"
              />
            </S.GoogleContainer>
          </S.AuthContainer>
        </S.LeftPane>
        <S.RightPane>
          <S.InfoImage src={dashboardImage} alt="Kodi Dashboard Preview" />
        </S.RightPane>
      </S.SplitContainer>
    </GoogleOAuthProvider>
  );
};

export default Auth;
