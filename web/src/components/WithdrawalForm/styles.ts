import styled from "styled-components";
import {
  colors,
  fonts,
  fontSizes,
  spacing,
  borderRadius,
} from "../../styles/foundation";

export const FormContainer = styled.div`
  background: #fff;
  padding: ${spacing.lg};
  border: 1px solid #e0e0e0;
  border-radius: ${borderRadius.md};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 1rem auto;
`;

export const FormTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${spacing.md};
  color: ${colors.primary};
  font-family: ${fonts.secondary};
  font-size: ${fontSizes["2xl"]};
  text-align: center;
`;

export const BalanceText = styled.p`
  text-align: center;
  margin-bottom: ${spacing.md};
  color: ${colors.text.secondary};
  font-size: ${fontSizes.md};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const RadioGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing.lg};
  font-size: ${fontSizes.md};

  label {
    cursor: pointer;
    input {
      margin-right: 0.5rem;
    }
  }
`;

export const InputField = styled.input`
  padding: ${spacing.sm};
  font-size: ${fontSizes.md};
  border: 1px solid #ccc;
  border-radius: ${borderRadius.sm};
  width: 100%;
  box-sizing: border-box;
`;

export const SubmitButton = styled.button`
  padding: ${spacing.sm};
  font-size: ${fontSizes.md};
  background: ${colors.primary};
  color: #fff;
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  transition: background 0.3s;

  &:disabled {
    background: #aaa;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${colors.secondary};
  }
`;

export const TrustBadgeContainer = styled.span`
  display: block;
  text-align: center;
  width: 100%;
  margin-top: 20px;

  a {
    text-decoration: none;
    color: #454545;
    font-size: 0.8em;
    margin-top: 0.6em;
    display: block;
  }

  img {
    width: 100%;
    max-width: 375px;
    height: auto;
    margin: 0 auto;
  }
`;
