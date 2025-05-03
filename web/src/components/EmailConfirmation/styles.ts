// File: /web/src/components/EmailConfirmation/styles.ts

import styled, { keyframes } from "styled-components";
import {
  colors,
  spacing,
  fontSizes,
  borderRadius,
  shadows,
} from "../../styles/foundation";
import { CheckCircle } from "lucide-react";

export const Section = styled.section`
  margin: ${spacing["2xl"]} 0;
  padding: ${spacing.lg};
  background: ${colors.neutral[100]};
  border: 1px solid ${colors.neutral[200]};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.md};
  position: relative;
  overflow: hidden;
  height: 100%;
`;

export const Button = styled.button<{ variant?: "secondary" }>`
  padding: ${spacing.sm} ${spacing.md};
  font-size: ${fontSizes.md};
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  background: ${({ variant }) =>
    variant === "secondary" ? colors.accent : colors.primary};
  color: ${colors.text.inverted};
  &:disabled {
    background: ${colors.neutral[300]};
    cursor: not-allowed;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  gap: ${spacing.sm};
  margin-top: ${spacing.md};
`;

export const Input = styled.input`
  flex: 1;
  padding: ${spacing.sm};
  font-size: ${fontSizes.md};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.sm};
`;

export const Error = styled.p`
  margin-top: ${spacing.sm};
  color: ${colors.error};
  font-size: ${fontSizes.sm};
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 3px solid ${colors.neutral[300]};
  border-top-color: ${colors.neutral};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: auto;
`;

export const VerifiedContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  background: ${colors.success};
  border-radius: ${borderRadius.md};
  color: ${colors.text.inverted};
  font-size: ${fontSizes.lg};
  justify-content: center;
`;

export const CheckIcon = styled(CheckCircle)`
  width: 2rem;
  height: 2rem;
  animation: pop 0.3s ease-out;
  @keyframes pop {
    0% {
      transform: scale(0.3);
      opacity: 0;
    }
    80% {
      transform: scale(1.1);
      opacity: 1;
    }
    100% {
      transform: scale(1);
    }
  }
`;
