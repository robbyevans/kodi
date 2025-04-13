// File: /web/src/components/Quiz/styles.ts

import styled from "styled-components";
import {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  spacing,
  borderRadius,
  shadows,
} from "../../styles/foundation";

export const QuizContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${colors.neutral[100]};
  padding: ${spacing.xl};
  position: relative;
  text-align: center;

  @media (max-width: 768px) {
    padding: ${spacing.lg};
  }
`;

export const BackButton = styled.button`
  position: absolute;
  top: ${spacing.lg};
  left: ${spacing.lg};
  background: transparent;
  border: none;
  color: ${colors.primary};
  cursor: pointer;
  transition: color 0.2s ease;
  font-size: 30px;

  &:hover {
    color: ${colors.secondary};
  }

  @media (max-width: 768px) {
    top: ${spacing.md};
    left: ${spacing.md};
    font-size: ${fontSizes["xl"]};
  }
`;

export const QuizSection = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${colors.text.inverted};
  padding: ${spacing.lg};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.lg};
  margin-bottom: ${spacing.lg};

  @media (max-width: 768px) {
    padding: ${spacing.md};
    margin-bottom: ${spacing.md};
  }
  @media (max-width: 400px) {
    margin-top: -60px;
  }
`;

export const QuizTitle = styled.h2`
  font-family: ${fonts.secondary};
  font-size: ${fontSizes["2xl"]};
  color: ${colors.primary};
  margin-bottom: ${spacing.lg};
  text-align: center;

  @media (max-width: 768px) {
    font-size: ${fontSizes["xl"]};
    margin-bottom: ${spacing.md};
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const OptionButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background: ${colors.background};
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.secondary};
    transform: translateY(-1px);
    color: ${colors.text.inverted};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  align-items: stretch; /* Ensures children (inputs) take full width */
  margin-bottom: ${spacing.lg};
`;

// File: /web/src/components/Quiz/styles.ts

export const Input = styled.input`
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${colors.primary}; /* Solid border in primary color */
  border-radius: ${borderRadius.sm};
  font-size: ${fontSizes.md};
  background: ${colors.background};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${colors.secondary}; /* Change border color on focus */
    box-shadow: 0 0 0 3px ${colors.primary}20;
    outline: none;
    transform: scale(1.02); /* Slight scaling effect */
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: ${spacing.sm} ${spacing.md};
  background: ${colors.primary};
  color: ${colors.text.inverted};
  border: none;
  border-radius: ${borderRadius.sm};
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.secondary};
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${colors.neutral[300]};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const GoogleContainer = styled.div`
  margin: ${spacing.lg} 0;
  display: flex;
  justify-content: center;
`;

export const TermsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  margin-top: ${spacing.md};
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;

export const TermsLabel = styled.label`
  font-size: ${fontSizes.sm};
  color: ${colors.text.secondary};
`;

export const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: ${fontSizes.sm};
  margin-top: ${spacing.sm};
  text-align: center;
`;
