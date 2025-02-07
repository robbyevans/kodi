import styled from "styled-components";

import {
  colors,
  borderRadius,
  shadows,
  spacing,
  fontWeights,
  fontSizes,
} from "../../styles/foundation";

export const PropertyCard = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.neutral[100]};
  border: 1px solid ${colors.neutral[200]};
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.md};
    border-color: ${colors.primary};
  }
`;

export const PropertyImage = styled.div<{ $image?: string }>`
  height: 180px;
  background: ${colors.neutral[200]};
  background-image: url(${({ $image }) => $image});

  background-size: cover;
  background-position: center;
`;

export const PropertyInfo = styled.div`
  padding: ${spacing.md};

  h3 {
    font-size: ${fontSizes.lg};
    color: ${colors.text.primary};
    margin: 0 0 ${spacing.sm};
  }
`;

export const PropertyStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
  color: ${colors.text.secondary};
  font-size: ${fontSizes.sm};
`;

export const ViewDetailsButton = styled.button`
  display: block;
  width: 100%;
  padding: ${spacing.sm};
  background: transparent;
  border: none;
  border-top: 1px solid ${colors.neutral[200]};
  color: ${colors.primary};
  font-weight: ${fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.neutral[100]};
    color: ${colors.secondary};
  }
`;
