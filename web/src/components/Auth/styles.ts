// File: /web/src/components/Auth/styles.ts

import styled from "styled-components";
import TestimonialsBackground from "../../assets/Testimonials Background.png";
import {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  spacing,
  borderRadius,
  shadows,
} from "../../styles/foundation";
import { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

// Overall split screen container
export const SplitContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }

  @media (max-width: 400px) {
    margin-top: -50px;
  }
`;

// Left pane for auth form
export const LeftPane = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.neutral[100]};
  padding: ${spacing.xl};

  @media (max-width: 768px) {
    padding: ${spacing.lg};
  }
`;

// Right pane for Kodi information
export const RightPane = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xl};
  background-image: url(${TestimonialsBackground});
  background-position: center;
  background-repeat: repeat;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const AuthContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  font-family: ${fonts.secondary};
  font-size: ${fontSizes["3xl"]};
  color: ${colors.primary};
  margin-bottom: ${spacing.lg};
  font-weight: ${fontWeights.bold};
  letter-spacing: -0.5px;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.sm};
`;

export const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: ${spacing.sm} ${spacing.md};
  margin-bottom: ${spacing.sm};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.md};
  font-size: ${fontSizes.md};
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
  font-size: ${fontSizes.md};
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

// Section for the GET STARTED button and helper text
export const GetStartedContainer = styled.div`
  margin-top: ${spacing.lg};
  text-align: center;
`;

export const GetStartedButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background: linear-gradient(135deg, ${colors.accent}, ${colors.secondary});
  color: ${colors.text.inverted};
  border: 1px solid ${colors.primary};
  border-radius: ${borderRadius.md};
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const GetStartedText = styled.p`
  margin-top: ${spacing.sm};
  font-size: ${fontSizes.sm};
  color: ${colors.text.secondary};
`;

// Styles for the right pane (information)
export const InfoContainer = styled.div`
  position: absolute;
  color: ${colors.text.primary};
  max-width: 500px;
  text-align: left;
`;

export const InfoTitle = styled.h1`
  font-family: ${fonts.secondary};
  font-size: ${fontSizes["3xl"]};
  color: ${colors.primary};
  margin-bottom: ${spacing.lg};
`;

export const InfoText = styled.p`
  font-size: ${fontSizes.md};
  margin-bottom: ${spacing.lg};
`;

export const InfoFeatures = styled.ul`
  position: relative;
  top: 268px;
  right: 134px;
  list-style-type: disc;
  padding-left: ${spacing.lg};
  margin-bottom: ${spacing.lg};
  font-size: ${fontSizes.md};
  color: ${colors.text.inverted};
`;

export const InfoImage = styled.img`
  position: relative;
  right: 27px;
  top: -36px;
  width: 114%;
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.md};

  @media (max-width: 768px) {
    position: static;
    width: 90%;
    margin-top: ${spacing.lg};
  }
`;

export const GoogleContainer = styled.div`
  width: 100%;
  margin: ${spacing.lg} 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const bounceIn = keyframes`
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  60% {
    transform: translateY(4px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
  }
`;

export const InstallButton = styled.button`
  margin-top: 12px;
  background: ${colors.accent};
  color: ${colors.text.inverted};
  padding: 8px 16px;
  border: none;
  border-radius: ${borderRadius.md};
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${bounceIn} 0.8s ease forwards;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${colors.primary};
    transform: translateY(-1px) scale(1.03);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

export const InstallButtonTopRight = styled.button`
  position: fixed;
  top: 16px;
  right: 16px;
  background-color: #ffff;
  color: ${colors.text.inverted};
  padding: 10px;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  font-weight: ${fontWeights.bold};
  cursor: pointer;
  z-index: 999;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  animation: ${bounce} 1.5s infinite ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    top: 12px;
    right: 12px;
  }
`;

export const SafariInstallBanner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${colors.primary};
  color: ${colors.text.inverted};
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${fontSizes.sm};
  z-index: 999;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.5s ease forwards;
  gap: 8px;

  @keyframes slideUp {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }

  strong {
    font-weight: ${fontWeights.semibold};
    margin: 0 4px;
  }

  button {
    background: transparent;
    border: 1px solid ${colors.text.inverted};
    color: ${colors.text.inverted};
    padding: 4px 8px;
    border-radius: ${borderRadius.sm};
    cursor: pointer;
    font-size: ${fontSizes.xs};
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      background: ${colors.text.inverted};
      color: ${colors.primary};
    }
  }

  @media (min-width: 768px) {
    display: none; /* Hide on large screens */
  }
`;
