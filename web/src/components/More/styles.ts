// File: /web/src/components/More/styles.ts

import styled, { keyframes, css } from "styled-components";
import {
  colors,
  spacing,
  fontSizes,
  borderRadius,
} from "../../styles/foundation";

export const slideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
`;

export const slideOut = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(100%); }
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

export const MenuHeader = styled.header`
  text-align: center;
  padding: ${spacing.md} 0;
  h1 {
    margin: 0;
    font-size: ${fontSizes["2xl"]};
    color: ${colors.text.primary};
  }
`;

export const SectionHeader = styled.div`
  position: relative;
  padding: ${spacing.md};
  z-index: 2;
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  color: ${colors.primary};
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

/**
 * We declare the `exiting` prop here so TS won’t complain,
 * and choose between slideIn/slideOut via css`…`
 */
export const SectionContainer = styled.div<{ exiting: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${colors.background};
  animation: ${({ exiting }) =>
    exiting
      ? css`
          ${slideOut} 0.3s forwards
        `
      : css`
          ${slideIn} 0.3s forwards
        `};
  z-index: 1;
`;
