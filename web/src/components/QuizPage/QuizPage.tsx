// File: /web/src/components/Quiz/quizPage.tsx

import React, { useState } from "react";
import { useAdmins } from "../../redux/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import * as S from "./styles";

const QuizPage = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
  const [houseCount, setHouseCount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { handleSignup, handleGoogleAuth } = useAdmins();
  const navigate = useNavigate();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      navigate("/auth");
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please confirm your password.");
      return;
    }
    setErrorMessage("");
    if (!agreed) return;
    // Optionally, combine quiz answers (userType & houseCount) with signup info.
    handleSignup(name, email, password);
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    const token = credentialResponse.credential;
    if (!token) {
      console.info("No token returned from Google");
      return;
    }
    // Optionally, pass quiz details along with the token.
    handleGoogleAuth(token, "signup");
  };

  const handleGoogleError = () => {
    console.info("Google signup failed");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <S.QuizContainer>
        {<S.BackButton onClick={handleBack}>←</S.BackButton>}

        {step === 1 && (
          <S.QuizSection>
            <S.QuizTitle>Are you a landlord or agent?</S.QuizTitle>
            <S.Options>
              <S.OptionButton
                onClick={() => {
                  setUserType("landlord");
                  handleNext();
                }}
              >
                Landlord
              </S.OptionButton>
              <S.OptionButton
                onClick={() => {
                  setUserType("agent");
                  handleNext();
                }}
              >
                Agent
              </S.OptionButton>
            </S.Options>
          </S.QuizSection>
        )}

        {step === 2 && (
          <S.QuizSection>
            <S.QuizTitle>
              How many properties do you want to manage?
            </S.QuizTitle>
            <S.Options>
              <S.OptionButton
                onClick={() => {
                  setHouseCount("less than 5");
                  handleNext();
                }}
              >
                Less than 5
              </S.OptionButton>
              <S.OptionButton
                onClick={() => {
                  setHouseCount("more than 10");
                  handleNext();
                }}
              >
                More than 10
              </S.OptionButton>
              <S.OptionButton
                onClick={() => {
                  setHouseCount("more than 50");
                  handleNext();
                }}
              >
                More than 50
              </S.OptionButton>
            </S.Options>
          </S.QuizSection>
        )}

        {step === 3 && (
          <S.QuizSection>
            <S.QuizTitle>Create an account</S.QuizTitle>
            <S.Form onSubmit={handleSignupSubmit}>
              <S.Input
                type="text"
                placeholder="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <S.Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <S.TermsContainer>
                <S.Checkbox
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <S.TermsLabel>
                  I agree to Kodi-Analytics Terms and Conditions
                </S.TermsLabel>
              </S.TermsContainer>
              {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
              <S.Button type="submit" disabled={!agreed}>
                Signup
              </S.Button>
            </S.Form>

            <S.GoogleContainer>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signup_with"
                shape="pill"
                size="large"
              />
            </S.GoogleContainer>
          </S.QuizSection>
        )}
      </S.QuizContainer>
    </GoogleOAuthProvider>
  );
};

export default QuizPage;
