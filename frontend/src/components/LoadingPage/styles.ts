import styled, { keyframes } from "styled-components";
import { colors } from "../../styles/foundation";

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
  height: 100vh;
  background: ${colors.primary};
  color: ${colors.background};
`;

export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const AnimatedIcon = styled.div`
  animation: ${pulse} 2s ease-in-out infinite;
  margin-bottom: 1rem;
`;

export const FadeInText = styled.h1`
  font-size: 2.5rem;
  animation: ${fadeIn} 1s ease-out;
  letter-spacing: 2px;
`;

export const ProgressBar = styled.div`
  width: 300px;
  height: 4px;
  background: ${colors.secondary}40;
  border-radius: 2px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: ${colors.background};
  animation: ${progress} 2s ease-in-out infinite;
`;
