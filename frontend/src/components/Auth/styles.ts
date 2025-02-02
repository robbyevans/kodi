// File: /frontend/src/components/Auth/styles.ts
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${spacing.xl};
  background: ${colors.neutral[100]};
`;

export const Title = styled.h1`
  font-family: ${fonts.secondary};
  font-size: ${fontSizes["3xl"]};
  color: ${colors.primary};
  margin-bottom: ${spacing.lg};
  font-weight: ${fontWeights.bold};
  letter-spacing: -0.5px;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: ${spacing.sm} ${spacing.md};
  margin-bottom: ${spacing.sm};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.md};
  font-size: ${fontSizes.base};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: ${shadows.sm} ${colors.primary}20;
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  max-width: 400px;
  padding: ${spacing.sm};
  background: ${colors.primary};
  color: ${colors.text.inverted};
  font-size: ${fontSizes.base};
  font-weight: ${fontWeights.semibold};
  border: none;
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};

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

export const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: ${fontSizes.sm};
  margin-top: ${spacing.sm};
`;

export const ToggleText = styled.p`
  color: ${colors.text.secondary};
  font-size: ${fontSizes.sm};
  margin-top: ${spacing.md};
`;

export const ToggleLink = styled.span`
  color: ${colors.primary};
  cursor: pointer;
  font-weight: ${fontWeights.semibold};
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.secondary};
    text-decoration: underline;
  }
`;

export const Divider = styled.div`
  width: 100%;
  max-width: 400px;
  margin: ${spacing.lg} 0;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${colors.neutral[500]};

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${colors.neutral[300]};
  }

  &::before {
    margin-right: ${spacing.md};
  }

  &::after {
    margin-left: ${spacing.md};
  }
`;
