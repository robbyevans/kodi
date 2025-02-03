import React, { useEffect, useState } from "react";
import * as S from "./styles";

export type ToastType = "success" | "error" | "info" | null;

interface ToastProps {
  message: string | null;
  type?: ToastType;
  clearToastMessage: () => void;
}

const ToastMessage: React.FC<ToastProps> = ({
  message,
  type = "success",
  clearToastMessage,
}) => {
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  // Auto-clear the toast after 3 seconds when a new message appears
  useEffect(() => {
    if (!message) return;

    setExiting(false);
    setProgress(100);

    const interval = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - 100 / 30)); // 30 steps over 3 seconds
    }, 100);

    const timeout = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        clearToastMessage();
      }, 400); // Wait for the slideUpOut animation to finish
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [message, clearToastMessage]);

  if (!message) return null; // Hide component if no message

  return (
    <S.ToastContainer type={type} exiting={exiting ? true : undefined}>
      <S.Message>{message}</S.Message>
      <S.Button onClick={clearToastMessage}>close</S.Button>
      <S.ProgressBar progress={progress} />
    </S.ToastContainer>
  );
};

export default ToastMessage;
