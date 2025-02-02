// File: /frontend/src/components/Navbar/styles.ts
import styled from "styled-components";
import { colors, spacing, shadows } from "../../styles/foundation";

export const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.primary};
  color: ${colors.text.inverted};
  padding: ${spacing.md} ${spacing.xl};
  box-shadow: ${shadows.md};
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
  margin: 0;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${colors.text.inverted};
  padding: ${spacing.xs};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: ${colors.accent};
    transform: scale(1.1);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
