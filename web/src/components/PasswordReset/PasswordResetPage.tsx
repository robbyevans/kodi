import React from "react";
import * as S from "./styles";

export type ResetStep = "request" | "verify" | "reset";

export interface ResetPasswordPageProps {
  step: ResetStep;
  loading: boolean;
  error: string | null;
  email: string;
  code: string;
  pw: string;
  pw2: string;
  cooldown: number;

  onBack: () => void;
  onEmailChange: (v: string) => void;
  onCodeChange: (v: string) => void;
  onPwChange: (v: string) => void;
  onPw2Change: (v: string) => void;
  onResend: () => void;
  onSubmit: React.FormEventHandler;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({
  step,
  loading,
  error,
  email,
  code,
  pw,
  pw2,
  cooldown,
  onBack,
  onEmailChange,
  onCodeChange,
  onPwChange,
  onPw2Change,
  onResend,
  onSubmit,
}) => (
  <S.Container>
    <S.BackButton onClick={onBack}>← Back</S.BackButton>
    <S.Wrapper>
      <h1>Reset Password</h1>
      <form onSubmit={onSubmit}>
        {/* STEP 1: Email */}
        <S.Section active={step === "request"}>
          <S.Field>
            <label>Your Email</label>
            <input
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              disabled={step !== "request"}
              required
            />
          </S.Field>
          {step === "request" && (
            <S.SubmitSmallButton disabled={loading}>
              Send Code
            </S.SubmitSmallButton>
          )}
        </S.Section>

        {/* STEP 2: Code */}

        <S.Section active={step === "verify" || step === "reset"}>
          <S.Field>
            <label>Verification Code</label>
            <input
              type="text"
              placeholder="ABC123"
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              disabled={step !== "verify"}
              required
            />
          </S.Field>
          {step === "verify" && (
            <>
              <S.ResendContainer>
                {cooldown === 0 ? (
                  <S.ResendButton type="button" onClick={onResend}>
                    Resend Code
                  </S.ResendButton>
                ) : (
                  <span>Wait {cooldown}s to resend</span>
                )}
              </S.ResendContainer>
              <S.SubmitSmallButton disabled={loading}>
                Verify Code
              </S.SubmitSmallButton>
            </>
          )}
        </S.Section>

        {/* STEP 3: New Password */}
        <S.Section active={step === "reset"}>
          <S.Field>
            <label>New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={pw}
              onChange={(e) => onPwChange(e.target.value)}
              disabled={step !== "reset"}
              required
            />
          </S.Field>
          <S.Field>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={pw2}
              onChange={(e) => onPw2Change(e.target.value)}
              disabled={step !== "reset"}
              required
            />
          </S.Field>
          {step === "reset" && (
            <S.SubmitSmallButton disabled={loading}>
              Reset Password
            </S.SubmitSmallButton>
          )}
        </S.Section>

        {error && <S.ErrorAlert>{error}</S.ErrorAlert>}
      </form>
    </S.Wrapper>
  </S.Container>
);

export default ResetPasswordPage;
