// File: /web/src/components/Quiz/quizPage.tsx

import React, { useState } from "react";
import { useAdmins } from "../../redux/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as S from "./styles";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const numericRegex = /^[0-9]+$/;

const QuizPage = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
  console.info("userType", userType);
  const [houseCount, setHouseCount] = useState("");
  console.info("houseConut", houseCount);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const { handleSignup, handleGoogleAuth, error } = useAdmins();
  const [errorMessage, setErrorMessage] = useState(error);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () =>
    step > 1 ? setStep((prev) => prev - 1) : navigate("/auth");

  const validateForm = () => {
    const newErrors = {
      name: name ? "" : "Name is required",
      email: email
        ? emailRegex.test(email)
          ? ""
          : "Invalid email format"
        : "Email is required",
      phone: phone
        ? numericRegex.test(phone.replace(/\D/g, ""))
          ? ""
          : "Phone number must contain digits only"
        : "Phone number is required",
      password: password ? "" : "Password is required",
      confirmPassword:
        confirmPassword === password ? "" : "Passwords do not match",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!agreed) return;
    setErrorMessage("");
    handleSignup(name, email, password, phone);
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    const token = credentialResponse.credential;
    if (!token) {
      console.info("No token returned from Google");
      return;
    }
    handleGoogleAuth(token, "signup");
  };

  const handleGoogleError = () => {
    console.info("Google signup failed");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <S.QuizContainer>
        <S.BackButton onClick={handleBack}>←</S.BackButton>

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
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <S.ErrorMessage>{errors.name}</S.ErrorMessage>}

              <S.Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <S.ErrorMessage>{errors.email}</S.ErrorMessage>}

              <PhoneInput
                country={"ke"}
                value={phone}
                onChange={(value) => setPhone(value)}
                inputStyle={{
                  width: "100%",
                  padding: "10px 10px 10px 50px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
                buttonStyle={{
                  border: "none",
                  background: "transparent",
                  left: "10px",
                }}
              />
              {errors.phone && <S.ErrorMessage>{errors.phone}</S.ErrorMessage>}

              <S.Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <S.ErrorMessage>{errors.password}</S.ErrorMessage>
              )}

              <S.Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <S.ErrorMessage>{errors.confirmPassword}</S.ErrorMessage>
              )}

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
