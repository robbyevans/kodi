import styled from "styled-components";
import {
  colors,
  fontSizes,
  spacing,
  borderRadius,
  shadows,
} from "../../styles/foundation";

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.primary};
  color: ${colors.text.inverted};
  padding: 0 16px;
  box-shadow: ${shadows.md};
  position: relative;
  border-bottom: 1px solid ${colors.secondary};
`;

export const AppName = styled.h1`
  font-size: ${fontSizes.lg};
  font-weight: bold;
  cursor: pointer;
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 50px;
  justify-content: flex-end;
  gap: ${spacing.md};
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: ${fontSizes.xl};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.sm};
  border-radius: ${borderRadius.sm};
  transition: background 0.3s;

  &:hover {
    background: #265d50;
  }
`;

export const MoreDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: ${colors.neutral[100]};
  color: ${colors.text.primary};
  padding: ${spacing.md};
  box-shadow: ${shadows.md};
  border-radius: ${borderRadius.md};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background: ${colors.neutral[100]};
  color: ${colors.text.primary};
  padding: ${spacing.md};
  box-shadow: ${shadows.md};
  border-radius: ${borderRadius.md};
  z-index: 1000;
`;

export const MenuItem = styled.div`
  padding: ${spacing.sm};
  cursor: pointer;
  border-bottom: 1px solid ${colors.neutral[300]};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${colors.neutral[200]};
  }
`;
