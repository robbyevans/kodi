import styled, { keyframes } from "styled-components";
import { ToastType } from "./ToastMessage";

export const slideIn = keyframes`
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
`;

export const ToastContainer = styled.div<{ type: ToastType }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${({ type }) =>
    type === "success" ? "#4caf50" : type === "error" ? "#f44336" : "#2196f3"};
  color: #fff;
  padding: 16px 20px;
  border-radius: 4px;
  min-width: 280px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: ${slideIn} 0.4s ease-out;
  font-family: sans-serif;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  height: 4px;
  background: rgba(255, 255, 255, 0.7);
  width: ${({ progress }) => progress}%;
  transition: width 0.1s linear;
  border-radius: 0 0 4px 4px;
  margin-top: 8px;
`;
