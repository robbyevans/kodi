// File: /web/src/components/Modals/SettlePaymentModal/styles.ts
import styled from "styled-components";
import {
  colors,
  spacing,
  borderRadius,
  shadows,
} from "../../../styles/foundation";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent backdrop */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* ensure it’s on top of everything */
`;

export const Modal = styled.div`
  background-color: #fff;
  width: 400px;
  max-width: 90%;
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.md};
  padding: ${spacing.lg};
  display: flex;
  flex-direction: column;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 ${spacing.sm};
  color: ${colors.text.primary};
`;

export const ModalBody = styled.div`
  flex: 1;
  margin-bottom: ${spacing.md};
  color: ${colors.text.primary};

  p {
    margin: ${spacing.xs} 0;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.sm};
`;

export const PrimaryButton = styled.button`
  background-color: ${colors.primary};
  color: #fff;
  border: none;
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.9;
  }
`;

export const SecondaryButton = styled.button`
  background-color: ${colors.neutral[200]};
  color: ${colors.text.primary};
  border: none;
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${colors.neutral[100]};
  }
`;
