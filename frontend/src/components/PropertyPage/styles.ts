import styled from "styled-components";

export const PropertyPageContainer = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
  font-family: Arial, sans-serif;
`;

export const Header = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2rem;
  color: #053a2f;
  text-align: center;
`;

export const TableContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
  margin-top: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
`;

export const TableHeader = styled.th`
  padding: 1.2rem;
  text-align: left;
  background-color: #2d6a4f;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  border-bottom: 2px solid #1b3a2e;

  &:first-child {
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
  }
`;

export const TableData = styled.td`
  padding: 1.2rem;
  text-align: left;
  border-bottom: 2px solid #ddd;
  border-left: 2px solid #ddd;
  color: #333;
  font-size: 1rem;

  &:last-child {
    text-align: center;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #eef5f1;
  }
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
  display: block;
  margin: 2rem auto;
  padding: 0.8rem 2rem;
  background-color: #2d6a4f;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #1b3a2e;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const AddPropertyButton = styled.button`
  background-color: #4285f4; /* Blue */
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 25px;

  &:hover {
    background-color: #357abd; /* Slightly darker blue */
  }
`;
