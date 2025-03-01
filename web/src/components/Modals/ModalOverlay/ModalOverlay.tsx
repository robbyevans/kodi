// File: /web/src/components/ModalOverlay.tsx
import React from "react";
import ReactDOM from "react-dom";
import { StyledModalOverlay } from "./styles";

interface ModalOverlayProps {
  children: React.ReactNode;
  isBlury?: boolean;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  children,
  isBlury = false,
}) => {
  return ReactDOM.createPortal(
    <StyledModalOverlay $isBlury={isBlury}>{children}</StyledModalOverlay>,
    document.body
  );
};

export default ModalOverlay;
