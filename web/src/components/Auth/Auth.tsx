import {
  SplitContainer,
  LeftPane,
  RightPane,
  AuthContainer,
  InfoTitle,
  SafariInstallBanner,
  InstallButtonTopRight,
  GetStartedContainer,
  GetStartedButton,
  GetStartedText,
  Form,
  Input,
  Button,
  ErrorMessage,
  Divider,
  GoogleContainer,
  InfoImage,
  ForgotLink,
} from "./styles";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import dashboardImage from "../../assets/dashboard.png";
import { CredentialResponse } from "@react-oauth/google";

const isMobileSafari = () => {
  const ua = window.navigator.userAgent;
  return (
    /iPhone|iPad|iPod/.test(ua) && /Safari/.test(ua) && !/CriOS|FxiOS/.test(ua)
  );
};

type Props = {
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
  showBanner: boolean;
  showInstallButton: boolean;
  setEmail: (e: string) => void;
  setPassword: (e: string) => void;
  setShowBanner: (e: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleGoogleSuccess: (resp: CredentialResponse) => void;

  handleGoogleError: () => void;
  handleInstallClick: () => void;
  handleGetStarted: () => void;
};

const AuthView = ({
  email,
  password,
  error,
  loading,
  showBanner,
  showInstallButton,
  setEmail,
  setPassword,
  setShowBanner,
  handleSubmit,
  handleGoogleSuccess,
  handleGoogleError,
  handleInstallClick,
  handleGetStarted,
}: Props) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <SplitContainer>
        <LeftPane>
          <AuthContainer>
            <InfoTitle>
              Own your properties, not the hassle. Kodi does the rest.
            </InfoTitle>

            {isMobileSafari() && showBanner && (
              <SafariInstallBanner>
                📲 Add Kodi App to Home Screen: Tap{" "}
                <strong>Share → Add to Home Screen</strong>
                <button onClick={() => setShowBanner(false)}>Dismiss</button>
              </SafariInstallBanner>
            )}

            {showInstallButton && (
              <InstallButtonTopRight onClick={handleInstallClick}>
                📲
              </InstallButtonTopRight>
            )}

            <GetStartedContainer>
              <GetStartedButton onClick={handleGetStarted}>
                GET STARTED
              </GetStartedButton>
              <GetStartedText>
                New to Kodi? Begin your journey and set up your property
                management experience.
              </GetStartedText>
            </GetStartedContainer>

            <Form onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Login"}
              </Button>{" "}
              <ForgotLink to="/password-reset">Forgot password? + </ForgotLink>
            </Form>

            <Divider>OR</Divider>

            <GoogleContainer>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signin_with"
                shape="pill"
                size="large"
              />
            </GoogleContainer>
          </AuthContainer>
        </LeftPane>
        <RightPane>
          <InfoImage src={dashboardImage} alt="Kodi Dashboard Preview" />
        </RightPane>
      </SplitContainer>
    </GoogleOAuthProvider>
  );
};

export default AuthView;
