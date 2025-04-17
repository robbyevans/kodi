import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../redux/hooks/useAdmin";
import AuthView from "../components/Auth/Auth";
import { CredentialResponse } from "@react-oauth/google";

const AuthContainer = () => {
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
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    if (isAuthenticated && user.role === "admin") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, user.role, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;
    if (!token) return;
    handleGoogleAuth(token, "login");
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") console.log("✅ User accepted install");
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  const handleGetStarted = () => {
    navigate("/quiz");
  };

  return (
    <AuthView
      email={email}
      password={password}
      error={error}
      loading={loading}
      showBanner={showBanner}
      showInstallButton={showInstallButton}
      setEmail={setEmail}
      setPassword={setPassword}
      setShowBanner={setShowBanner}
      handleSubmit={handleSubmit}
      handleGoogleSuccess={handleGoogleSuccess}
      handleGoogleError={() => console.info("Google login failed")}
      handleInstallClick={handleInstallClick}
      handleGetStarted={handleGetStarted}
    />
  );
};

export default AuthContainer;
