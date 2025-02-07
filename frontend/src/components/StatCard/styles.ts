import styled from "styled-components";

import {
  colors,
  fontSizes,
  fontWeights,
  spacing,
} from "../../styles/foundation";

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  margin-top: 16px;
`;
export const QuickStats = styled.div`
  h3 {
    font-size: ${fontSizes.xl};
    color: ${colors.primary};
    margin-bottom: ${spacing.lg};
  }
`;

export const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${spacing.sm} 0;
  border-bottom: 1px solid ${colors.neutral[200]};

  span {
    color: ${colors.text.secondary};
  }

  strong {
    color: ${colors.text.primary};
    font-weight: ${fontWeights.semibold};
  }
`;

export const Label = styled.span`
`
