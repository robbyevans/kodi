import styled from "styled-components";
import {
  colors,
  fontSizes,
  spacing,
  borderRadius,
  shadows,
  fonts,
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
  z-index: 1000;
  margin: 0 16px;
`;

export const ModalContent = styled.div`
  background: ${colors.background};
  width: 450px;
  padding: ${spacing.lg};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  position: relative;
`;

export const ModalHeader = styled.h2`
  font-size: ${fontSizes.xl};
  font-family: ${fonts.secondary};
  text-align: center;
  color: ${colors.primary};
  margin-bottom: ${spacing.sm};
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const InputField = styled.input`
  padding: ${spacing.sm};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSizes.base};
  transition: border-color 0.3s ease;
  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.sm};
  margin-top: ${spacing.md};
`;

export const SubmitButton = styled.button`
  background: ${colors.primary};
  color: ${colors.text.inverted};
  padding: ${spacing.sm} ${spacing.md};
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  font-size: ${fontSizes.base};
  transition: background 0.3s ease;
  &:hover {
    background: ${colors.secondary};
  }
`;

export const CancelButton = styled.button`
  background: ${colors.neutral[300]};
  color: ${colors.text.primary};
  padding: ${spacing.sm} ${spacing.md};
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  font-size: ${fontSizes.base};
  transition: background 0.3s ease;
  &:hover {
    background: ${colors.neutral[500]};
  }
`;

export const TenantList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-top: ${spacing.md};
`;

export const TenantItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.sm};
  background: ${colors.neutral[100]};
  border-radius: ${borderRadius.sm};
  box-shadow: ${shadows.sm};
`;

export const TenantName = styled.p`
  font-size: ${fontSizes.lg};
  font-weight: bold;
  color: ${colors.text.primary};
  margin: 0;
`;

export const TenantDetails = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.text.secondary};
  margin: 0;
`;

export const TenantActions = styled.div`
  display: flex;
  gap: ${spacing.xs};
`;

export const SectionHeader = styled.h3`
  font-size: ${fontSizes.lg};
  text-align: center;
  color: ${colors.primary};
  margin-top: ${spacing.lg};
`;

export const StatusMessage = styled.p`
  text-align: center;
  font-size: ${fontSizes.base};
  color: ${colors.text.secondary};
`;

export const EditButton = styled.button`
  background: ${colors.primary};
  color: ${colors.text.inverted};
  padding: ${spacing.xs} ${spacing.sm};
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  font-size: ${fontSizes.sm};
  transition: background 0.2s ease;
  &:hover {
    background: ${colors.secondary};
  }
`;

export const DeleteButton = styled.button`
  background: ${colors.error};
  color: ${colors.text.inverted};
  padding: ${spacing.xs} ${spacing.sm};
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  font-size: ${fontSizes.sm};
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.9;
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
