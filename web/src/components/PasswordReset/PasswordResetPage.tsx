import React, { useState } from "react";
import { usePasswordReset } from "../../redux/hooks/usePasswordReset";
import * as S from "./styles";

const PasswordResetPage: React.FC = () => {
  const { step, loading, error, sendCode, verifyCode, reset } =
    usePasswordReset();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "request") sendCode(email);
    else if (step === "verify") verifyCode(email, code);
    else reset(email, code, pw, pw2);
  };

  return (
    <S.Container>
      <h1>Reset Password</h1>
      <form onSubmit={onSubmit}>
        {step === "request" && (
          <>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </>
        )}
        {step === "verify" && (
          <>
            <input
              type="text"
              placeholder="Verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </>
        )}
        {step === "reset" && (
          <>
            <input
              type="password"
              placeholder="New password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              required
            />
          </>
        )}
        {error && <S.Error>{error}</S.Error>}
        <button type="submit" disabled={loading}>
          {loading
            ? "…"
            : step === "request"
            ? "Send Code"
            : step === "verify"
            ? "Verify Code"
            : "Reset Password"}
        </button>
      </form>
    </S.Container>
  );
};

export default PasswordResetPage;
