import styled, { keyframes } from "styled-components";
import {
  colors,
  spacing,
  fontSizes,
  borderRadius,
} from "../../styles/foundation";

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
`;

export const PageWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: relative;
    width: 100%;
    height: 100vh;
    background: ${colors.background};
    overflow: hidden;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: ${spacing.md};
  background: ${colors.primary};
  color: ${colors.text.inverted};

  h1 {
    flex: 1;
    text-align: center;
    margin: 0;
    font-size: ${fontSizes.lg};
  }
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  color: ${colors.text.inverted};
  font-size: ${fontSizes.lg};
  cursor: pointer;
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: ${spacing.md};
  margin: 0;
`;

export const MenuItem = styled.li`
  padding: ${spacing.md};
  margin-bottom: ${spacing.sm};
  background: ${colors.neutral[100]};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSizes.md};
  color: ${colors.text.primary};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${colors.neutral[200]};
  }
`;

export const SectionContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${colors.background};
  animation: ${slideIn} 0.3s forwards;
`;
