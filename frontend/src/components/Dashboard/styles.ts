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

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.neutral[100]};
  overflow: scroll;
  border: 1px solid red;
`;

export const DashboardHeader = styled.header`
  margin-bottom: ${spacing.xl};
  padding: ${spacing.lg};
  background: ${colors.background};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-family: ${fonts.secondary};
    font-size: ${fontSizes["3xl"]};
    color: ${colors.primary};
    margin-bottom: ${spacing.sm};
  }

  p {
    color: ${colors.text.secondary};
    font-size: ${fontSizes.lg};
    margin: 0;
  }
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.xl};

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 300px;
  }
`;

export const PropertyListContainer = styled.div`
  background: ${colors.background};
  padding: ${spacing.lg};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
`;

export const PropertyListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: ${spacing.xl};

  h2 {
    font-size: ${fontSizes["2xl"]};
    color: ${colors.primary};
    margin: 0;
  }
`;

export const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${spacing.md};
`;

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

export const PropertyImage = styled.div`
  height: 180px;
  background: ${colors.neutral[200]};
  /* background-image: url("src/assets/apartment-placeholder.png"); */

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

export const AddPropertyButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  background: ${colors.primary};
  color: ${colors.text.inverted};
  padding: ${spacing.sm} ${spacing.md};
  border: none;
  border-radius: ${borderRadius.md};
  font-size: ${fontSizes.base};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.secondary};
    transform: translateY(-1px);
  }
`;

export const SidePanel = styled.aside`
  background: ${colors.background};
  padding: ${spacing.lg};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  height: fit-content;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing.xl};
  color: ${colors.text.secondary};

  h3 {
    color: ${colors.text.primary};
    margin-bottom: ${spacing.sm};
  }

  p {
    margin-bottom: ${spacing.lg};
  }
`;

export const ErrorMessage = styled.p`
  color: ${colors.warning};
  font-size: ${fontSizes.base};
  text-align: center;
`;

export const LoadingMessage = styled.p`
  color: ${colors.success};
  font-size: ${fontSizes.base};
  text-align: center;
`;

export const DateDisplay = styled.span`
  font-size: ${fontSizes.base};
  font-weight: ${fontWeights.medium};
  color: ${colors.text.secondary};
`;
