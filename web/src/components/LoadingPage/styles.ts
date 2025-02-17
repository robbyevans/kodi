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
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  color: ${colors.background};
  padding: ${spacing.xl};
  height: 100vh;

  @media (max-width: 768px) {
    padding: ${spacing.md};
  }
`;

export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: ${spacing.lg};

  @media (max-width: 768px) {
    margin-bottom: ${spacing.md};
  }
`;

export const AnimatedIcon = styled.div`
  animation: ${pulse} 2s ease-in-out infinite;
  margin-bottom: ${spacing.sm};

  svg {
    width: 64px;
    height: 64px;

    @media (max-width: 768px) {
      width: 48px;
      height: 48px;
    }
  }
`;

export const FadeInText = styled.h1`
  font-size: ${fontSizes["3xl"]};
  animation: ${fadeIn} 1s ease-out;
  letter-spacing: 2px;
  font-family: sans-serif;
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${fontSizes["xl"]};
  }

  @media (max-width: 480px) {
    font-size: ${fontSizes["lg"]};
  }
`;

export const ProgressBar = styled.div`
  width: 300px;
  height: 4px;
  background: ${colors.secondary}40;
  border-radius: ${spacing.xs};
  overflow: hidden;
  margin-top: ${spacing.lg};

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: ${colors.background};
  animation: ${progress} 2s ease-in-out;
`;
