import styled from "styled-components";
import {
  colors,
  spacing,
  shadows,
  fontSizes,
  fontWeights,
} from "../../styles/foundation";

export const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.primary};
  color: ${colors.text.inverted};
  padding: ${spacing.md} ${spacing.xl};
  box-shadow: ${shadows.md};
  position: sticky;
  top: 0;
  z-index: 1000;
  flex-wrap: wrap;
`;

export const NavbarLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: ${fontSizes["2xl"]};
  font-weight: ${fontWeights.semibold};
  margin: 0;
  letter-spacing: -0.5px;
`;

export const WelcomeText = styled.span`
  font-size: ${fontSizes.base};
  margin-top: ${spacing.xs};
`;

export const NavbarRight = styled.div`
  display: flex;
  align-items: center;
`;

/* Desktop menu (hidden on mobile) */
export const DesktopMenu = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${colors.text.inverted};
  padding: ${spacing.xs};
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
  display: flex;
  align-items: center;
  font-size: ${fontSizes.lg};
  margin-left: ${spacing.sm};

  &:hover {
    color: ${colors.neutral[300]};
    transform: scale(1.1);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

/* Mobile hamburger button (visible only on mobile) */
export const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${colors.text.inverted};
  padding: ${spacing.xs};
  cursor: pointer;
  font-size: ${fontSizes.lg};
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

/* Mobile dropdown menu */
export const MobileMenu = styled.div`
  width: 100%;
  background: ${colors.secondary};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${spacing.sm} 0;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileMenuItem = styled.button`
  background: none;
  border: none;
  color: ${colors.text.inverted};
  width: 100%;
  text-align: left;
  padding: ${spacing.sm} ${spacing.xl};
  font-size: ${fontSizes.base};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  transition: background 0.2s ease;

  &:hover {
    background: ${colors.primary};
  }
`;
