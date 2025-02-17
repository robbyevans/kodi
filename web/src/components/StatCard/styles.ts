import styled from "styled-components";
import {
  colors,
  fontSizes,
  fontWeights,
  spacing,
  borderRadius,
  shadows,
} from "../../styles/foundation";

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
