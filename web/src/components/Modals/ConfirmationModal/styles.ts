import styled from "styled-components";
import {
  colors,
  fonts,
  spacing,
  borderRadius,
  fontSizes,
  shadows,
} from "../../../styles/foundation";

export const ModalContainer = styled.div`
  background: ${colors.background};
  padding: ${spacing.lg};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.lg};
  max-width: 400px;
  width: 90%;
  text-align: center;
  position: relative;
  margin: 0 16px;
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
  -webkit-box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);
  box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);

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
    -webkit-box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);
  box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);

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
