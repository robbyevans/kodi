import styled, { keyframes } from "styled-components";
import {
  colors,
  fonts,
  fontSizes,
  spacing,
  borderRadius,
} from "../../styles/foundation";

/* ----------------------------- Main Components ----------------------------- */

// Outer Container
export const AnalyticsContainer = styled.div`
  background: ${colors.background};
  min-height: 100vh;
  padding: ${spacing["2xl"]} ${spacing.xl};
  font-family: ${fonts.primary};
  color: ${colors.text.primary};
`;

// Page Header
export const AnalyticsHeader = styled.header`
  text-align: left;
  margin-bottom: ${spacing.xl};

  h1 {
    font-family: ${fonts.secondary};
    font-size: ${fontSizes["2xl"]};
    color: ${colors.primary};
    margin-bottom: ${spacing.xs};
  }

  p {
    font-size: ${fontSizes.sm};
    color: ${colors.text.secondary};
  }
`;

// Top Stats Container
export const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.md};
  margin-bottom: ${spacing.xl};
`;

// Stat Card
export const StatCard = styled.div`
  flex: 1 1 250px;
  background-color: #fff;
  border-radius: ${borderRadius.md};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: ${spacing.lg};
  text-align: left;
  min-width: 200px;
  position: relative; /* For positioning skeleton badges */
`;

// Stat Title
export const StatTitle = styled.h3`
  font-size: ${fontSizes.sm};
  color: ${colors.text.secondary};
  margin-bottom: ${spacing.xs};
`;

// Stat Value
export const StatValue = styled.div`
  font-size: ${fontSizes["2xl"]};
  font-weight: bold;
  margin-bottom: ${spacing.xs};
`;

// Stat Subtitle
export const StatSubtitle = styled.div`
  font-size: ${fontSizes.sm};
  color: ${colors.text.secondary};
`;

// Payment Rate Badge (for the bottom right of the stat card)
export const PaymentRateBadge = styled.div<{ rate: number }>`
  position: absolute;
  right: ${spacing.lg};
  bottom: ${spacing.lg};
  background-color: ${({ rate }) => (rate < 60 ? "#c0392b" : "#27ae60")};
  color: #fff;
  padding: ${spacing.sm};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSizes.sm};
  font-weight: bold;
`;

// Section Titles
export const SectionTitle = styled.h2`
  font-size: ${fontSizes.xl};
  margin: ${spacing.xl} 0 ${spacing.md};
  color: ${colors.primary};
`;

// Table Wrapper
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-bottom: ${spacing.lg};
`;

// Table
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  background-color: #fff;
  border-radius: ${borderRadius.md};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  thead {
    background-color: ${colors.primary};
    color: #fff;
    tr {
      th {
        padding: ${spacing.sm};
        text-align: left;
        font-weight: 600;
      }
    }
  }

  tbody {
    tr {
      &:hover {
        background-color: #f9f9f9;
      }

      td {
        padding: ${spacing.sm};
        border-bottom: 1px solid #eee;
      }
    }
  }
`;

// Status Pill
export const StatusPill = styled.span<{ color?: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: ${fontSizes.sm};
  background-color: ${({ color }) => color || "#ccc"};
  color: #fff;
`;

// Download Statement Button
export const DownloadButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background-color: ${colors.secondary};
  color: #fff;
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  margin-bottom: ${spacing.lg};

  &:hover {
    background-color: ${colors.primary};
  }
`;

// Ledger Button (if needed)
export const LedgerButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background-color: ${colors.primary};
  color: #fff;
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  margin-top: ${spacing.md};

  &:hover {
    background-color: ${colors.secondary};
  }
`;

/* ------------------------- Skeleton Loader Styles -------------------------- */

// Shimmer animation
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

// A reusable skeleton block component
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
