// File: /frontend/src/components/Footer/styles.ts
import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #034d3c; /* Deep green */
  color: white;
  text-align: center;
  padding: 0.8rem;
  position: sticky;
  bottom: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const FooterText = styled.p`
  font-size: 1rem;
  margin: 0;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
