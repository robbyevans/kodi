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

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
  }
`;

export const NavGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  color: ${colors.text.inverted};
  font-size: ${fontSizes.lg};
  cursor: pointer;
  margin-right: ${spacing.sm};
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.neutral[300]};
  }
`;

export const Title = styled.h1`
  font-size: ${fontSizes["2xl"]};
  font-weight: ${fontWeights.semibold};
  margin: 0;
  letter-spacing: -0.5px;
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

  &:hover {
    color: ${colors.neutral[300]};
    transform: scale(1.1);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
