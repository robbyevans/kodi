import styled from "styled-components";
import {
  colors,
  fonts,
  spacing,
  borderRadius,
  fontSizes,
  shadows,
} from "../../../styles/foundation";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: ${colors.background};
  padding: ${spacing.lg};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.lg};
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

export const ModalMessage = styled.p`
  font-family: ${fonts.primary};
  font-size: ${fontSizes.lg};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.lg};
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ConfirmButton = styled.button`
  background: ${colors.error};
  color: ${colors.text.inverted};
  padding: ${spacing.sm} ${spacing.md};
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  font-size: ${fontSizes.base};
  &:hover {
    opacity: 0.9;
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
  &:hover {
    background: ${colors.neutral[200]};
  }
`;
