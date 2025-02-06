import { useState, useEffect } from "react";
import { useAdmins } from "../../redux/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import * as S from "./styles";

const Auth = () => {
  const { loading, error, role, isAuthenticated, handleLogin, handleSignup } =
    useAdmins();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && password !== passwordConfirmation) {
      setErrorMessage("Passwords do not match. Please confirm your password.");
      return;
    } else {
      setErrorMessage("");
    }

    if (!isLogin) {
      handleSignup(name, email, password);
    } else {
      handleLogin(email, password);
    }
  };

  useEffect(() => {
    if (isAuthenticated && role === "admin") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, role, navigate]);

  const handleGoogleSuccess = (credentialResponse: any) => {
    console.log("Google login success:", credentialResponse);
    // Implement Google OAuth logic here
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
  };

  // Clear password fields on error
  useEffect(() => {
    if (error) {
      setPassword("");
      setPasswordConfirmation("");
    }
  }, [error]);

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <S.Container>
        <S.Title>{isLogin ? "Login" : "Signup"}</S.Title>
        {!isLogin && (
          <S.Input
            type="name"
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
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
        {!isLogin && (
          <S.Input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        )}

        {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

        <S.Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : isLogin ? "Login" : "Signup"}
        </S.Button>

        <S.ToggleText>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <S.ToggleLink onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Signup" : "Login"}
          </S.ToggleLink>
        </S.ToggleText>

        <S.Divider>OR</S.Divider>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          text={isLogin ? "signin_with" : "signup_with"}
          shape="pill"
          size="large"
        />
      </S.Container>
    </GoogleOAuthProvider>
  );
};

export default Auth;
