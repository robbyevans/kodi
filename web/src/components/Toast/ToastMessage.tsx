import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import * as S from "./styles";

export type ToastType = "success" | "error" | "info" | "warning" | null;

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
      }, 400); // Wait for the fadeOut animation to finish
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [message, clearToastMessage]);

  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle />;
      case "error":
        return <FaExclamationCircle />;
      case "info":
        return <FaInfoCircle />;
      case "warning":
        return <FaExclamationCircle />;
      default:
        return null;
    }
  };

  return (
    <S.ToastContainer type={type} exiting={exiting ? true : undefined}>
      <S.Content>
        <S.IconContainer>{getIcon()}</S.IconContainer>
        <S.Message>{message}</S.Message>
      </S.Content>
      <S.Button onClick={clearToastMessage}>
        <FaTimes />
      </S.Button>
      <S.ProgressBar progress={progress} />
    </S.ToastContainer>
  );
};

export default ToastMessage;
