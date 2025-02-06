import styled, { keyframes } from "styled-components";
import { ToastType } from "./ToastMessage";
import { fontSizes } from "../../styles/foundation";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

interface ToastContainerProps {
  type: ToastType;
  exiting?: boolean;
}

export const ToastContainer = styled.div<ToastContainerProps>`
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);

  background: ${({ type }) =>
    type === "success"
      ? "#4caf50"
      : type === "error"
      ? "#f44336"
      : type === "warning"
      ? "#ff9800"
      : "#2196f3"};
  color: #fff;
  padding: 20px 30px;
  border-radius: 4px;
  min-width: 280px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: sans-serif;
  animation: ${({ exiting }) => (exiting ? fadeOut : fadeIn)} 0.4s ease-out;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
`;

export const IconContainer = styled.div`
  display: flex;
  margin-right: 12px;
  font-size: 25px;
`;

export const Message = styled.div`
  flex: 1;
  margin-right: 12px;
  font-size: ${fontSizes.lg};
`;

export const Button = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.7);
  width: ${({ progress }) => progress}%;
  transition: width 0.1s linear;
  border-radius: 0 0 4px 4px;
`;
