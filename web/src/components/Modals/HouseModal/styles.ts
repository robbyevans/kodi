import styled from "styled-components";
import {
  colors,
  fontSizes,
  spacing,
  borderRadius,
  shadows,
} from "../../../styles/foundation";

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
    font-size: ${fontSizes.md};
    font-weight: 500;
  }
`;

export const InputField = styled.input`
  padding: ${spacing.sm};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.md};
  font-size: ${fontSizes.md};
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
  background: ${colors.error};
  border: none;
  border-radius: ${borderRadius.md};
  color: ${colors.text.inverted};
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  -webkit-box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);
  box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);

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
  -webkit-box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);
  box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);

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

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  margin-top: ${spacing.xs};

  span {
    color: ${colors.text.secondary};
    font-size: ${fontSizes.sm};
  }
`;
