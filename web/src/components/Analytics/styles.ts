import styled from "styled-components";
import {
  colors,
  fonts,
  fontSizes,
  spacing,
  borderRadius,
} from "../../styles/foundation";

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

// Top Stats
export const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.md};
  margin-bottom: ${spacing.xl};
`;

export const StatCard = styled.div`
  flex: 1 1 250px;
  background-color: #fff;
  border-radius: ${borderRadius.md};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: ${spacing.lg};
  text-align: left;
  min-width: 200px;
`;

export const StatTitle = styled.h3`
  font-size: ${fontSizes.sm};
  color: ${colors.text.secondary};
  margin-bottom: ${spacing.xs};
`;

export const StatValue = styled.div`
  font-size: ${fontSizes["2xl"]};
  font-weight: bold;
  margin-bottom: ${spacing.xs};
`;

export const StatSubtitle = styled.div`
  font-size: ${fontSizes.sm};
  color: ${colors.text.secondary};
`;

// Section Titles
export const SectionTitle = styled.h2`
  font-size: ${fontSizes.xl};
  margin: ${spacing.xl} 0 ${spacing.md};
  color: ${colors.primary};
`;

// Table
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-bottom: ${spacing.lg};
`;

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

// Ledger Button
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
