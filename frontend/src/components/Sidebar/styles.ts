import styled from "styled-components";
import {
  colors,
  spacing,
  shadows,
  fontSizes,
  fontWeights,
  borderRadius,
} from "../../styles/foundation";

export const SidebarContainer = styled.nav`
  width: 250px;
  background: ${colors.primary};
  color: ${colors.text.inverted};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: ${shadows.md};
  padding: ${spacing.lg} ${spacing.md};

  @media (max-width: 768px) {
    width: 200px;
    padding: ${spacing.md} ${spacing.sm};
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

export const WelcomeText = styled.span`
  display: block;
  font-size: ${fontSizes.base};
  margin-top: ${spacing.xs};
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const MenuItem = styled.button`
  background: none;
  border: none;
  color: inherit;
  width: 100%;
  padding: ${spacing.sm};
  display: flex;
  align-items: center;
  font-size: ${fontSizes.base};
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  border-radius: ${borderRadius.sm};

  &:hover {
    background: ${colors.secondary};
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
  margin-top: auto;

  &:hover {
    background: ${colors.error};
    transform: translateX(-5px);
  }
`;
