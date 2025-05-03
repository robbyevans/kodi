import styled from "styled-components";
import {
  colors,
  spacing,
  fontSizes,
  borderRadius,
} from "../../styles/foundation";

export const Container = styled.div`
  margin-top: ${spacing.xl};
  padding: ${spacing.md};
  background: ${colors.background};
  border-radius: ${borderRadius.md};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Error = styled.p`
  color: ${colors.error};
  margin-bottom: ${spacing.sm};
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: ${spacing.sm};
  border-bottom: 1px solid ${colors.neutral[200]};
  cursor: pointer;

  &:hover {
    background: ${colors.neutral[100]};
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: ${colors.background};
  padding: ${spacing.lg};
  border-radius: ${borderRadius.md};
  max-width: 500px;
  width: 90%;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${spacing.sm};
  right: ${spacing.sm};
  background: transparent;
  border: none;
  font-size: ${fontSizes.lg};
  cursor: pointer;
`;

export const RecipientList = styled.ul`
  list-style: none;
  margin: ${spacing.md} 0 0 0;
  padding: 0;
`;
