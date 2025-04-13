import styled, { keyframes } from "styled-components";
import {
  colors,
  fontSizes,
  fontWeights,
  spacing,
  borderRadius,
  shadows,
} from "../../styles/foundation";

// ----------------------------- StatCard Components -----------------------------

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: ${spacing.md};
`;

export const QuickStats = styled.div`
  background: ${colors.background};
  padding: ${spacing.lg};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  h3 {
    font-size: ${fontSizes.xl};
    color: ${colors.primary};
    margin-bottom: ${spacing.lg};
    text-align: center;
  }
`;

export const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${spacing.sm} 0;
  border-bottom: 1px solid ${colors.neutral[200]};

  &:last-child {
    border-bottom: none;
  }

  span {
    color: ${colors.text.secondary};
    font-size: ${fontSizes.sm};
  }

  strong {
    color: ${colors.text.primary};
    font-weight: ${fontWeights.semibold};
    font-size: ${fontSizes.sm};
  }
`;

export const MiniQuickStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors.background};
  padding: ${spacing.sm};
  border-radius: ${borderRadius.sm};
  box-shadow: ${shadows.sm};
  overflow-x: auto;
  margin-bottom: ${spacing.lg};
`;

export const MiniStatItem = styled.div`
  flex: 1;
  text-align: center;
  min-width: 60px;

  span {
    display: block;
    font-size: ${fontSizes.xs};
    color: ${colors.text.secondary};
  }

  strong {
    font-size: ${fontSizes.sm};
    font-weight: ${fontWeights.semibold};
    color: ${colors.text.primary};
  }
`;

// ------------------------- Skeleton Loader Styles --------------------------

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const SkeletonBlock = styled.div<{
  width?: string;
  height?: string;
  marginBottom?: string;
  borderRadius?: string;
}>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "20px"};
  margin-bottom: ${({ marginBottom }) => marginBottom || "0"};
  border-radius: ${({ borderRadius }) => borderRadius || "4px"};
  background: #eee;
  background-image: linear-gradient(
    to right,
    #eee 0%,
    #f5f5f5 20%,
    #eee 40%,
    #eee 100%
  );
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s linear infinite;
`;
