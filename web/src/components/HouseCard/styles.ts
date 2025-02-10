// File: /web/src/components/HouseCard/styles.ts
import styled from "styled-components";

export const CardContainer = styled.div`
  padding: 1.5rem;
  background-color: #e6f4ea; /* Light green background */
  border: 1px solid #d0e6db; /* Soft green border */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const HouseTitle = styled.h3`
  font-size: 1.4rem;
  color: #053a2f; /* Dark green */
  margin-bottom: 0.5rem;
`;

export const HouseDetail = styled.p`
  font-size: 1rem;
  color: #034d3c; /* Deep green */
  margin: 0.3rem 0;
`;
