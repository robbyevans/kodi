import styled, { keyframes } from "styled-components";
import { ToastType } from "./ToastMessage";

// Animation to slide in from the top
const slideDownIn = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Animation to slide out to the top
const slideUpOut = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100%); opacity: 0; }
`;

interface ToastContainerProps {
  type: ToastType;
  exiting?: boolean;
}

export const ToastContainer = styled.div<ToastContainerProps>`
  position: fixed;
  top: 64px;
  left: 50%;
  transform: translate(-50%,-50%);
  background: ${({ type }) =>
    type === "success" ? "#4caf50" : type === "error" ? "#f44336" : "#2196f3"};
  color: #fff;
  padding: 16px 20px;
  border-radius: 4px;
  min-width: 280px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: sans-serif;
  animation: ${({ exiting }) => (exiting ? slideUpOut : slideDownIn)} 0.4s
    ease-out;
  overflow: hidden;
  flex-direction: column;
`;

// A container for the message text (so that the clear button can be placed at the top-right)
export const Message = styled.div`
  width: 100%;
  margin-bottom: 8px;
`;

// Clear button styled as an "X"
export const Button = styled.button`
  position: absolute;
  top: 4px;
  right: 8px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
`;

// Progress bar that reflects the remaining time
export const ProgressBar = styled.div<{ progress: number }>`
  height: 4px;
  background: rgba(255, 255, 255, 0.7);
  width: ${({ progress }) => progress}%;
  transition: width 0.1s linear;
  border-radius: 0 0 4px 4px;
  align-self: flex-start;
`;
