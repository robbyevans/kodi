import styled from "styled-components";
import {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  spacing,
  borderRadius,
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
    box-shadow: 0 0 0 3px ${colors.primary}20;
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
  text-align: center;
`;

export const ToggleText = styled.p`
  font-size: ${fontSizes.sm};
  margin-top: ${spacing.md};
  color: ${colors.text.secondary};
`;

export const ToggleLink = styled.span`
  color: ${colors.primary};
  font-weight: ${fontWeights.semibold};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.accent};
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
  position: relative;
  font-size: ${fontSizes.sm};

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
