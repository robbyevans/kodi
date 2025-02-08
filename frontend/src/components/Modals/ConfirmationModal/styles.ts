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
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  overflow: hidden;
  margin: 0 16px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0)
    );
    pointer-events: none;
  }
`;

export const ModalContainer = styled.div`
  background: ${colors.background};
  padding: ${spacing.lg};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.lg};
  max-width: 400px;
  width: 90%;
  text-align: center;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${spacing.md};
  color: ${colors.error};

  svg {
    font-size: ${fontSizes["3xl"]};
    margin-bottom: ${spacing.xs};
  }
`;

export const ModalTitle = styled.h3`
  font-family: ${fonts.secondary};
  font-size: ${fontSizes["2xl"]};
  color: ${colors.text.primary};
  margin: 0;
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
  font-size: ${fontSizes.xl};
  transition: background 0.2s ease;
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
  font-size: ${fontSizes.xl};
  transition: background 0.2s ease;
  &:hover {
    background: ${colors.neutral[200]};
  }
`;

export const ModalMessage = styled.p`
  font-family: ${fonts.primary};
  font-size: ${fontSizes.lg};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.lg};
`;

export const BoldText = styled.span`
  font-weight: bold;
  color: ${colors.text.primary};
`;
