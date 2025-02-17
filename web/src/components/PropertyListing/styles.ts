import styled, { keyframes } from "styled-components";
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

  @media (max-width: 768px) {
    padding: ${spacing.lg};
    margin-bottom: ${spacing.xl};
  }
`;

export const ListingHeader = styled.div`
  margin-bottom: ${spacing.lg};

  h2 {
    font-family: ${fonts.secondary};
    font-size: ${fontSizes["2xl"]};
    color: ${colors.primary};
    font-weight: ${fontWeights.semibold};

    @media (max-width: 768px) {
      font-size: ${fontSizes.xl};
    }
  }
`;

export const PropertiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

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

export const PropertyMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    align-items: flex-start;
    gap: ${spacing.sm};
  }
`;

export const PropertyNumber = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.text};
  margin-right: ${spacing.sm};
`;

export const PropertyWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  flex: 1;
`;

export const PropertyIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
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

  @media (max-width: 768px) {
    font-size: ${fontSizes.xs};
  }
`;

export const PropertyActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
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

export const EditFormContainer = styled.div<{ expanded: boolean }>`
  max-height: ${({ expanded }) => (expanded ? "fit-content" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  padding: ${({ expanded }) => (expanded ? spacing.sm : "0")};
  border-top: ${({ expanded }) =>
    expanded ? `1px solid ${colors.neutral[300]}` : "none"};
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: ${spacing.md};
  border: 1px solid ${colors.background};

  @media (max-width: 768px) {
    padding: ${spacing.sm};
    gap: ${spacing.sm};
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

export const InputLabel = styled.label`
  font-size: ${fontSizes.xs};
  color: ${colors.primary};
  font-weight: ${fontWeights.medium};
`;

export const InputField = styled.input`
  padding: ${spacing.sm};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSizes.base};
  outline: none;
  flex: 1;
`;

export const FileInput = styled.input`
  font-size: ${fontSizes.sm};
  color: ${colors.text.primary};
`;

export const ImagePreview = styled.img`
  margin-top: ${spacing.xs};
  max-width: 100px;
  max-height: 100px;
  border-radius: ${borderRadius.sm};
  object-fit: cover;
  border: 1px solid ${colors.neutral[300]};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

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
  padding: 5px 10px;
  -webkit-box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);
  box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);

  &:hover {
    color: ${colors.secondary};
  }
`;
// Skeleton loading keyframes
const skeletonLoading = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Skeleton container (similar to your PropertyListingContainer)
export const PropertyListingSkeletonContainer = styled.section`
  background: ${colors.neutral[100]};
  padding: ${spacing.xl};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  margin-bottom: ${spacing["2xl"]};
`;

// Skeleton for the header (e.g., “Managed Properties”)
export const SkeletonHeader = styled.div`
  height: 32px;
  width: 30%;
  margin-bottom: ${spacing.lg};
  border-radius: ${borderRadius.sm};
  background: ${colors.neutral[300]};
  background-size: 200px 100%;
  animation: ${skeletonLoading} 1.5s infinite linear;
`;

// Container for the list of property skeleton items
export const PropertiesSkeletonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

// Each skeleton item (mimics a PropertyItem)
export const PropertySkeletonItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.md};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.sm};
`;

// A circle skeleton for the image/icon
export const SkeletonCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.neutral[300]};
  background-size: 200px 100%;
  animation: ${skeletonLoading} 1.5s infinite linear;
`;

// Wrapper for the text lines
export const SkeletonTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  flex: 1;
`;

// Text skeleton (width is passed as a prop)
export const SkeletonText = styled.div<{ width: string }>`
  height: 16px;
  width: ${({ width }) => width};
  border-radius: ${borderRadius.sm};
  background: ${colors.neutral[300]};
  background-size: 200px 100%;
  animation: ${skeletonLoading} 1.5s infinite linear;
`;
