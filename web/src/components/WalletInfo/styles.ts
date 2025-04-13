// File: /web/src/components/WalletInfo/styles.ts
import styled from "styled-components";
import {
  colors,
  fontSizes,
  spacing,
  borderRadius,
  fonts,
} from "../../styles/foundation";

export const WalletContainer = styled.div`
  background: ${colors.neutral[100]};
  padding: ${spacing.lg};
  border-radius: ${borderRadius.md};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: ${spacing.xl};
  text-align: center;
`;

export const WalletHeader = styled.div`
  margin-bottom: ${spacing.md};

  h2 {
    font-size: ${fontSizes["2xl"]};
    color: ${colors.primary};
    font-family: ${fonts.secondary};
  }
`;

export const WalletBalance = styled.div`
  font-size: ${fontSizes["3xl"]};
  color: ${colors.success || "green"};
  margin-bottom: ${spacing.md};
  font-weight: bold;
`;

export const StatementButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background-color: ${colors.primary};
  color: #fff;
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  font-size: ${fontSizes.md};

  &:hover {
    background-color: ${colors.secondary};
  }
`;
