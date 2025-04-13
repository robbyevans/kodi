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
  max-width: 400px;
  box-shadow: ${shadows.md};
  margin: 0 16px;

  @media (max-width: 480px) {
    /* Reduce padding and adjust width for smaller screens */
    padding: ${spacing.lg};
    max-height: 500px;
    overflow-y: scroll;
    margin: 16px;
  }
`;

export const ModalHeader = styled.h2`
  font-size: ${fontSizes["2xl"]};
  margin-bottom: ${spacing.lg};
  color: ${colors.primary};
  text-align: center;
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

export const FormGroup = styled.div`
  margin-bottom: ${spacing.lg};

  label {
    display: block;
    margin-bottom: ${spacing.xs};
    font-size: ${fontSizes.md};
    color: ${colors.primary};
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: ${spacing.sm};
    font-size: ${fontSizes.md};
    border: 1px solid ${colors.neutral[300]};
    border-radius: ${borderRadius.md};

    &:focus {
      outline: none;
      border-color: ${colors.primary};
    }
  }

  .terms-label {
    display: flex;
    align-items: center;
    gap: ${spacing.sm};

    input {
      width: auto;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${spacing.md};
  justify-content: flex-end;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
