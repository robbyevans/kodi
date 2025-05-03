import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ResetPasswordPage, {
  ResetStep,
} from "../components/PasswordReset/PasswordResetPage";
import { usePasswordReset } from "../redux/hooks/usePasswordReset";
import { useAppDispatch } from "../redux/utils";
import { toRequest } from "../redux/slices/passwordResetSlice";

const PasswordResetPageContainer: React.FC = () => {
  const { step, loading, error, sendCode, verifyCode, reset } =
    usePasswordReset();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // local form state
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  // cooldown timer for “Resend Code”
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  // Reset everything and go back to auth
  const handleBack = useCallback(() => {
    dispatch(toRequest());
    setEmail("");
    setCode("");
    setPw("");
    setPw2("");
    navigate("/auth");
  }, [dispatch, navigate]);

  const handleResend = useCallback(() => {
    if (!loading) {
      sendCode(email);
      setCooldown(60);
    }
  }, [sendCode, email, loading]);

  const handleSubmit: React.FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (step === "request") {
        sendCode(email);
      } else if (step === "verify") {
        verifyCode(email, code);
      } else {
        reset(email, code, pw, pw2);
      }
    },
    [step, sendCode, verifyCode, reset, email, code, pw, pw2]
  );

  return (
    <ResetPasswordPage
      step={step as ResetStep}
      loading={loading}
      error={error}
      email={email}
      code={code}
      pw={pw}
      pw2={pw2}
      cooldown={cooldown}
      onBack={handleBack}
      onEmailChange={setEmail}
      onCodeChange={setCode}
      onPwChange={setPw}
      onPw2Change={setPw2}
      onResend={handleResend}
      onSubmit={handleSubmit}
    />
  );
};

export default PasswordResetPageContainer;
