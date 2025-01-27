import styled from "styled-components";

export const PropertyPageContainer = styled.div`
  padding: 2rem;
  background-color: #fafafa;
`;

export const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #053a2f;
`;

export const TableContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  background-color: #2d6a4f;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const TableData = styled.td`
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  color: #333;
`;

export const LoadingMessage = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: #2d6a4f;
`;

export const ErrorMessage = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: #d9534f;
`;

export const DownloadButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background-color: #2d6a4f;
  color: white;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #1b3a2e;
  }
`;
