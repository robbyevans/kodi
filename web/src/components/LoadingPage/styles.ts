import styled, { keyframes } from "styled-components";
import { colors, fontSizes, spacing } from "../../styles/foundation";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const progress = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  background: ${colors.primary};
  color: ${colors.background};
  padding: ${spacing.xl};
`;

export const LogoContainer = styled.div`
  text-align: center;
`;

export const AnimatedIcon = styled.div`
  animation: ${pulse} 2s ease-in-out infinite;
  margin-bottom: ${spacing.sm};
`;

export const FadeInText = styled.h1`
  font-size: ${fontSizes["3xl"]};
  animation: ${fadeIn} 1s ease-out;
  letter-spacing: 2px;
  font-family: sans-serif;
`;

export const ProgressBar = styled.div`
  width: 300px;
  height: 4px;
  background: ${colors.secondary}40;
  border-radius: ${spacing.xs};
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: ${colors.background};
  animation: ${progress} 2s ease-in-out;
`;
