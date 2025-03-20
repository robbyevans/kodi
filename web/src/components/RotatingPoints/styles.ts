import styled, { keyframes } from "styled-components";
import { fontSizes, spacing } from "../../styles/foundation";

// Animation for the wheel effect: the active point slides in from the bottom,
// remains visible, and then slides out toward the top.
const scrollAnimation = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  20% {
    transform: translateY(0%);
    opacity: 1;
  }
  80% {
    transform: translateY(0%);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

export const InfoFeatures = styled.ul`
  list-style: none;
  margin: ${spacing.lg} 0 0;
  padding: 0;
  position: relative;
  width: 300px; /* adjust to your layout */
  height: 40px; /* height for one line of text */
  overflow: hidden;
`;

export const InfoPoint = styled.li<{ $active: boolean }>`
  font-family: sans-serif;
  margin: 0;
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: ${fontSizes.lg};
  /* Only the active point is visible and animates */
  opacity: ${(props) => (props.$active ? 1 : 0)};
  animation: ${(props) => (props.$active ? scrollAnimation : "none")} 2s linear
    forwards;
`;
