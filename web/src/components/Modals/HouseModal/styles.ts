import styled from "styled-components";
import {
  colors,
  fontSizes,
  spacing,
  borderRadius,
  shadows,
} from "../../../styles/foundation";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Consistent overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  position: relative;
  background: ${colors.background};
  border-radius: ${borderRadius.lg};
  width: 90%;
  max-width: 500px;
  padding: ${spacing.xl};
  box-shadow: ${shadows.md};
  margin: 0 16px;
`;

export const ModalHeader = styled.h2`
  margin: 0 0 ${spacing.lg};
  text-align: center;
  color: ${colors.primary};
  font-size: ${fontSizes["2xl"]};
`;

export const FormGroup = styled.div`
  margin-bottom: ${spacing.md};
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: ${spacing.xs};
    color: ${colors.text.secondary};
    font-size: ${fontSizes.base};
    font-weight: 500;
  }
`;

export const InputField = styled.input`
  padding: ${spacing.sm};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.md};
  font-size: ${fontSizes.base};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.md};
  margin-top: ${spacing.lg};
`;

export const DeleteButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background: #e74c3c;
  border: none;
  border-radius: ${borderRadius.md};
  color: ${colors.text.inverted};
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #c0392b;
  }
`;

export const SubmitButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background: ${colors.primary};
  border: none;
  border-radius: ${borderRadius.md};
  color: ${colors.text.inverted};
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${colors.secondary};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
`;
