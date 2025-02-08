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
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 16px;
`;

export const ModalContent = styled.div`
  background: ${colors.background};
  padding: ${spacing.xl};
  border-radius: ${borderRadius.lg};
  width: 100%;
  max-width: 500px;
  box-shadow: ${shadows.md};
`;

export const ModalHeader = styled.h2`
  font-size: ${fontSizes["2xl"]};
  margin-bottom: ${spacing.lg};
  color: ${colors.primary};
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: ${spacing.lg};

  label {
    display: block;
    margin-bottom: ${spacing.xs};
    font-size: ${fontSizes.base};
    color: ${colors.primary};
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: ${spacing.sm};
    font-size: ${fontSizes.base};
    border: 1px solid ${colors.neutral[300]};
    border-radius: ${borderRadius.md};

    &:focus {
      outline: none;
      border-color: ${colors.primary};
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${spacing.md};
  justify-content: flex-end;
  margin-top: ${spacing.lg};
`;

export const CancelButton = styled.button`
  background: ${colors.error};
  color: ${colors.text.inverted};
  padding: ${spacing.sm} ${spacing.md};
  border: none;
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #d32f2f;
  }
`;

export const SubmitButton = styled.button`
  background: ${colors.success};
  color: ${colors.text.inverted};
  padding: ${spacing.sm} ${spacing.md};
  border: none;
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #2c8d45;
  }
`;
