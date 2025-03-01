import styled from "styled-components";
import {
  colors,
  fontSizes,
  spacing,
  borderRadius,
  shadows,
} from "../../../styles/foundation";

export const ModalContent = styled.div`
  background: ${colors.background};
  padding: ${spacing.xl};
  border-radius: ${borderRadius.lg};
  width: 100%;
  max-width: 500px;
  box-shadow: ${shadows.md};
  margin: 0 16px;
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

  input,
  select {
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

export const PaymentSection = styled.div`
  padding: ${spacing.md};
  margin-bottom: ${spacing.lg};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.md};
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};

  /* Optionally limit height on smaller screens */
  max-height: 263px;
  overflow-y: auto;
`;

export const Instructions = styled.div`
  margin-bottom: ${spacing.md};
  padding: ${spacing.sm};
  border-left: 3px solid ${colors.primary};
  background: ${colors.neutral[100]};
  p {
    margin: ${spacing.xs} 0;
    font-size: ${fontSizes.sm};
    color: ${colors.text.secondary};
    line-height: 1.5;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${spacing.md};
  justify-content: flex-end;
  margin-top: ${spacing.lg};
`;

export const CancelButton = styled.button`
  background: ${colors.neutral};
  color: ${colors.text.primary};
  padding: ${spacing.sm} ${spacing.md};
  border: none;
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);

  &:hover {
    background: ${colors.neutral[500]};
  }
`;

export const SubmitButton = styled.button`
  background: ${colors.primary};
  color: ${colors.text.inverted};
  padding: ${spacing.sm} ${spacing.md};
  border: none;
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);

  &:hover {
    background: #2c8d45;
  }
`;

export const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.md};

  label {
    margin: 0;
    display: flex;
    align-items: center;
    gap: ${spacing.sm};
    cursor: pointer;
  }
`;

export const PaymentLogo = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

export const paymentText = styled.p`
  white-space: nowrap;
`;

export const InfoPoint = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.neutral[100]}; /* a light background */
  color: ${colors.primary}; /* matching primary color */
  padding: ${spacing.sm};
  border-left: 4px solid ${colors.primary};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSizes.sm};
  margin-top: ${spacing.xs};
  margin: 10px 0;
`;
