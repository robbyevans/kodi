// File: /frontend/src/components/AdminDashboardPage/styles.ts
import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f0f7f4; /* Light green shade */
  min-height: 100vh;
  color: #053a2f; /* Darker green for text */
`;

export const DashboardHeader = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #034d3c; /* Deep green */
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const LogoutButton = styled.button`
  background-color: #34a853; /* Primary green */
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2c8d45; /* Slightly darker green */
  }
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

export const PropertyListContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const PropertyListHeading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #034d3c;
`;

export const PropertyCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #e6f4ea; /* Soft green background */
  border: 1px solid #d0e6db; /* Light border */
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.4rem;
    margin: 0;
    color: #053a2f;
  }

  span {
    font-size: 1.1rem;
    color: #034d3c;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
`;

export const LoadingMessage = styled.p`
  color: #053a2f;
  font-size: 1.2rem;
`;
