import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useEmailConfirmation } from "../../redux/hooks/useEmailConfirmation";
import * as S from "./styles";
import { useAdmins } from "../../redux/hooks/useAdmin";

const EmailConfirmationSection: React.FC = () => {
  const { sent, loading, error, sendCode, confirm } = useEmailConfirmation();
  const { isUserEmailVerified, refreshUser } = useAdmins();
  const [code, setCode] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // when confirmed flips to true, trigger confetti
  useEffect(() => {
    if (isUserEmailVerified) {
      refreshUser();
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(t);
    }
  }, [isUserEmailVerified]);

  return (
    <S.Section>
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      {!isUserEmailVerified ? (
        <>
          <h2>Verify Your Email</h2>
          <p>
            Please confirm your email to secure your account and unlock all
            features.
          </p>

          <S.Button onClick={sendCode} disabled={loading}>
            {sent ? "Resend Code" : "Send Verification Code"}
          </S.Button>

          {sent && (
            <S.InputGroup>
              <S.Input
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={loading}
              />
              <S.Button
                variant="secondary"
                onClick={() => confirm(code)}
                disabled={loading || !code}
              >
                {loading ? <S.Spinner /> : "Confirm"}
              </S.Button>
            </S.InputGroup>
          )}

          {error && <S.Error>{error}</S.Error>}
        </>
      ) : (
        <S.VerifiedContainer>
          <S.CheckIcon />
          <span>Your email is verified!</span>
        </S.VerifiedContainer>
      )}
    </S.Section>
  );
};

export default EmailConfirmationSection;
