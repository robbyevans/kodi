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

export const PropertyListingContainer = styled.section`
  background: ${colors.neutral[100]};
  padding: ${spacing.xl};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  margin-bottom: ${spacing["2xl"]};
`;

export const ListingHeader = styled.div`
  margin-bottom: ${spacing.lg};
  h2 {
    font-family: ${fonts.secondary};
    font-size: ${fontSizes["2xl"]};
    color: ${colors.primary};
    font-weight: ${fontWeights.semibold};
  }
`;

export const PropertiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const PropertyItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors.background};
  padding: ${spacing.md};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.sm};
  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: ${shadows.md};
  }
`;

export const PropertyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PropertyName = styled.h3`
  font-size: ${fontSizes.lg};
  font-weight: ${fontWeights.semibold};
  color: ${colors.text.primary};
  margin: 0;
`;

export const PropertyUnits = styled.span`
  font-size: ${fontSizes.sm};
  color: ${colors.text.secondary};
`;

export const PropertyActions = styled.div`
  display: flex;
  gap: ${spacing.sm};
`;

export const EditButton = styled.button`
  background: ${colors.primary};
  color: ${colors.text.inverted};
  padding: ${spacing.xs} ${spacing.sm};
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  font-size: ${fontSizes.sm};
  transition: background 0.2s ease;
  &:hover {
    background: ${colors.secondary};
  }
`;

export const DeleteButton = styled.button`
  background: ${colors.error};
  color: ${colors.text.inverted};
  padding: ${spacing.xs} ${spacing.sm};
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  font-size: ${fontSizes.sm};
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.9;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`;

export const InputField = styled.input`
  padding: ${spacing.sm};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSizes.base};
  outline: none;
  flex: 1;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${colors.primary};
  cursor: pointer;
  font-size: ${fontSizes.lg};
  padding: ${spacing.xs};
  &:hover {
    color: ${colors.secondary};
  }
`;
