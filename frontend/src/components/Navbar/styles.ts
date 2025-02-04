// styles.ts
import styled from "styled-components";
import {
  colors,
  fontSizes,
  spacing,
  borderRadius,
  shadows,
} from "../../styles/foundation";

interface NavbarProps {
  isDarkMode: boolean;
}

export const Navbar = styled.nav<NavbarProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? colors.neutral[900] : colors.primary};
  color: ${colors.text.inverted};
  padding: ${spacing.md};
  box-shadow: ${shadows.md};
  max-height: 17px;
  border-bottom: 1px solid ${colors.secondary};
`;

export const AppName = styled.h1`
  font-size: ${fontSizes.lg};
  font-weight: bold;
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
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
    background: ${colors.neutral[700]};
  }
`;

export const Calendar = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background: ${colors.neutral[100]};
  color: ${colors.text.primary};
  padding: ${spacing.md};
  box-shadow: ${shadows.md};
  border-radius: ${borderRadius.md};
`;
