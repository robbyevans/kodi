import styled from "styled-components";
import {
  colors,
  spacing,
  shadows,
  fontSizes,
  fontWeights,
  borderRadius,
} from "../../styles/foundation";
import TestimonialsBackground from "../../assets/Testimonials Background.png";

// Full Sidebar for large screens
export const SidebarContainer = styled.nav`
  min-width: 185px;

  background-image: url(${TestimonialsBackground});
  background-position: center;
  background-repeat: repeat;
  color: ${colors.text.inverted};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: ${shadows.md};
  padding: ${spacing.lg} ${spacing.md};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SidebarHeader = styled.div`
  margin-bottom: ${spacing.lg};
`;

export const Title = styled.h1`
  font-size: ${fontSizes["2xl"]};
  font-weight: ${fontWeights.semibold};
  margin: 0;
  letter-spacing: -0.5px;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

// Updated MenuItem with active styling
export const MenuItem = styled.button<{ active?: boolean }>`
  background: ${(props) => (props.active ? "#265d50" : "none")};
  border: none;
  color: ${colors.text.inverted};
  width: 100%;
  padding: ${spacing.sm};
  display: flex;
  align-items: center;
  font-size: ${fontSizes.base};
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  border-radius: ${borderRadius.sm};

  &:hover {
    background: ${(props) => (props.active ? "#265d50" : colors.secondary)};
    transform: translateX(-5px);
  }

  &:active {
    transform: translateX(-2px);
  }

  svg {
    margin-right: ${spacing.sm};
    width: 24px;
    height: 24px;
  }
`;

export const MenuText = styled.span`
  flex: 1;
  text-align: left;
`;

export const LogoutItem = styled(MenuItem)`
  &:hover {
    background: ${colors.error};
    transform: translateX(-5px);
  }
`;

// Mobile hamburger icon (visible on small screens only)
export const MobileMenuIcon = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 6px;
    left: ${spacing.md};
    z-index: 1100;
    background: ${colors.primary};
    border: none;
    color: ${colors.text.inverted};
    font-size: ${fontSizes["2xl"]};
    padding: ${spacing.sm};
    border-radius: ${borderRadius.sm};
    box-shadow: ${shadows.md};
    cursor: pointer;
  }
`;

// Mobile dropdown menu (visible on small screens only)
export const MobileDropdown = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 60px;
    left: ${spacing.md};
    right: ${spacing.md};
    background: ${colors.primary};
    padding: ${spacing.md};
    box-shadow: ${shadows.md};
    border-radius: ${borderRadius.md};
    z-index: 1050;
  }
`;
