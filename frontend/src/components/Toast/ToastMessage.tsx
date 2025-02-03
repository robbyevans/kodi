import React, { useEffect, useState } from "react";
import * as S from "./styles";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  onClose,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev - 100 / 30);
    }, 100);

    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onClose]);

  return (
    <S.ToastContainer type={type}>
      {message}
      <S.ProgressBar progress={progress} />
    </S.ToastContainer>
  );
};

export default Toast;
