// File: /frontend/src/components/Navbar/styles.ts
import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #034d3c; /* Deep green */
  color: white;
  padding: 0.8rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    flex-wrap: wrap;
  }
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 1rem;

  &:hover {
    color: #e6f4ea; /* Light green */
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  flex-grow: 1;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 1rem;

  &:hover {
    color: #e6f4ea; /* Light green */
  }
`;
