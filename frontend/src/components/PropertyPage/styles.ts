import styled from "styled-components";
import {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  spacing,
  shadows,
  borderRadius,
} from "../../styles/foundation";

export const PropertyPageContainer = styled.div`
  padding: ${spacing.xl};
  background: ${colors.neutral[100]};
  flex: 1;
`;

export const Header = styled.h1`
  font-family: ${fonts.secondary};
  font-size: ${fontSizes["3xl"]};
  color: ${colors.primary};
  margin-bottom: ${spacing.xl};
  text-align: center;
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  margin: ${spacing.lg} 0;
  border-radius: ${borderRadius.sm};
  box-shadow: ${shadows.md};
  background: ${colors.background};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  padding: ${spacing.md};
  background: #dcdcdc;
  color: #717171;
  font-weight: ${fontWeights.semibold};
  text-align: left;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

export const TableData = styled.td`
  padding: ${spacing.md};
  border-bottom: 1px solid ${colors.neutral[200]};
  color: ${colors.text.primary};
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  &:last-child {
    text-align: center;
  }
`;

export const IconTableData = styled.div`
  display: flex;
  padding-left: 5px;
  gap: 12px;
  padding: 1rem 1rem 1rem 5px;
  color: ${colors.text.secondary};

  &:last-child {
    text-align: center;
  }
`;

export const TableRow = styled.tr`
  transition: background 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${colors.neutral[200]};
  }

  &:nth-child(even) {
    background: ${colors.neutral[100]};
  }
`;

export const LoadingMessage = styled.p`
  text-align: center;
  font-size: ${fontSizes.lg};
  color: ${colors.primary};
  font-weight: ${fontWeights.bold};
`;

export const ErrorMessage = styled.p`
  text-align: center;
  font-size: ${fontSizes.lg};
  color: ${colors.warning};
  font-weight: ${fontWeights.bold};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${spacing.xl};
`;

export const AddPropertyButton = styled.button`
  background: ${colors.background};
  color: ${colors.primary};
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.semibold};
  padding: ${spacing.md} ${spacing.lg};
  border: 1px solid ${colors.primary};
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${colors.success};
  }
`;

export const DownloadButton = styled.button`
  background: ${colors.primary};
  color: ${colors.text.inverted};
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.semibold};
  padding: ${spacing.md} ${spacing.lg};
  border: none;
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: background 0.3s;
  display: block;
  margin: ${spacing.xl} auto;

  &:hover {
    background: ${colors.success};
  }
`;

export const DownloadWRapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
`;
