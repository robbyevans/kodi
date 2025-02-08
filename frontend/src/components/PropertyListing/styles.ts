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

/* Container for each property item with a smooth transition */
export const PropertyItem = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.background};
  padding: ${spacing.md};
  gap: ${spacing.sm};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.sm};
  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: ${shadows.md};
  }
`;

/* The top row with main property details */
export const PropertyMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* Numbering style */
export const PropertyNumber = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.text};
  margin-right: ${spacing.sm};
`;

/* Container for property image and info */
export const PropertyWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  flex: 1;
`;

/* Styling the property image */
export const PropertyIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

/* Property name style */
export const PropertyName = styled.h3`
  font-size: ${fontSizes.lg};
  font-weight: ${fontWeights.semibold};
  color: ${colors.text.primary};
  margin: 0;
`;

/* Property units style */
export const PropertyUnits = styled.span`
  font-size: ${fontSizes.sm};
  color: ${colors.text.secondary};
`;

/* Actions container */
export const PropertyActions = styled.div`
  display: flex;
  gap: ${spacing.sm};
`;

/* Edit and Delete button styles */
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

/* The container that smoothly expands/retracts when editing */
export const EditFormContainer = styled.div<{ expanded: boolean }>`
  max-height: ${({ expanded }) => (expanded ? "150px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  padding: ${({ expanded }) => (expanded ? spacing.sm : "0")};
  border-top: ${({ expanded }) =>
    expanded ? `1px solid ${colors.neutral[300]}` : "none"};
`;

/* Group for inputs and action buttons in the edit form */
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: ${spacing.md};
  border: 1px solid ${colors.background};
`;

/* Input for editing the property name */
export const InputField = styled.input`
  padding: ${spacing.sm};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSizes.base};
  outline: none;
  flex: 1;
`;

/* Styled file input (you may further customize or wrap it with a label for custom styling) */
export const FileInput = styled.input`
  font-size: ${fontSizes.sm};
  color: ${colors.text.primary};
`;

/* Reuse IconButton styling */
export const StyledButton = styled.button<{ $isVariantAccept?: boolean }>`
  background: ${({ $isVariantAccept }) =>
    $isVariantAccept ? colors.primary : colors.neutral};
  border: none;
  color: ${({ $isVariantAccept }) =>
    $isVariantAccept ? colors.text.inverted : colors.neutral};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: ${fontSizes.sm};
  padding: 5px;
  -webkit-box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);
  box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);
  &:hover {
    color: ${colors.secondary};
  }
`;

export const InputWrapper = styled.div`
  display: flex;

  justify-content: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
