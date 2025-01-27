// File: /frontend/src/components/PropertyPage/styles.ts
import styled from "styled-components";

export const PropertyPageContainer = styled.div`
  padding: 2rem;
  background-color: #f0f7f4; /* Light green */
  min-height: 100vh;
  color: #053a2f; /* Dark green for text */
`;

export const Header = styled.h1`
  font-size: 2rem;
  color: #034d3c; /* Deep green */
  margin-bottom: 1.5rem;
`;

export const HousesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
`;

export const LoadingMessage = styled.p`
  color: #034d3c;
  font-size: 1.2rem;
`;
