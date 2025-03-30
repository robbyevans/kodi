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

  // PWA Install Prompt
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("✅ User accepted the install prompt");
      } else {
        console.log("❌ User dismissed the install prompt");
      }
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

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

            {showInstallButton && (
              <S.InstallButtonTopRight onClick={handleInstallClick}>
                📲
              </S.InstallButtonTopRight>
            )}

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
