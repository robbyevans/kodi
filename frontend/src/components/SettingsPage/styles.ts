// File: /frontend/src/components/SettingsPage/styles.ts
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

export const SettingsContainer = styled.div`
  background: ${colors.background};
  min-height: 100vh;
  padding: ${spacing["2xl"]} ${spacing.xl};
  font-family: ${fonts.primary};
  color: ${colors.text.primary};
`;

export const SettingsHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${spacing.xl};
  text-align: center;
  border-bottom: 2px solid ${colors.neutral[300]};
  padding-bottom: ${spacing.lg};

  h1 {
    font-family: ${fonts.secondary};
    font-size: ${fontSizes["3xl"]};
    color: ${colors.primary};
    margin-bottom: ${spacing.sm};
    font-weight: ${fontWeights.bold};
  }

  p {
    font-size: ${fontSizes.lg};
    color: ${colors.text.secondary};
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing["2xl"]};

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const UserInfoSection = styled.section`
  background: ${colors.neutral[100]};
  padding: ${spacing.xl};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
`;

export const PropertiesSection = styled.section`
  background: ${colors.neutral[100]};
  padding: ${spacing.xl};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
`;

export const SectionHeader = styled.div`
  margin-bottom: ${spacing.lg};
  h2 {
    font-family: ${fonts.secondary};
    font-size: ${fontSizes["2xl"]};
    font-weight: ${fontWeights.semibold};
    color: ${colors.primary};
    margin-bottom: ${spacing.sm};
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.lg};
  margin-bottom: ${spacing.lg};
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: ${borderRadius.full};
  object-fit: cover;
  box-shadow: ${shadows.lg};
  border: 4px solid ${colors.primary};
`;

export const EditableFields = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const EditableField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.background};
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.md};
  transition: background 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${colors.neutral[200]};
  }
`;

export const FieldLabel = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.medium};
  color: ${colors.text.secondary};
`;

export const FieldValue = styled.span`
  font-size: ${fontSizes.base};
  font-weight: ${fontWeights.regular};
  color: ${colors.text.primary};
  margin-left: ${spacing.md};
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  color: ${colors.primary};
  font-size: ${fontSizes.lg};
  cursor: pointer;
  padding: ${spacing.xs};

  &:hover {
    color: ${colors.secondary};
  }
`;

export const PropertiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const PropertyItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const PropertyName = styled.h3`
  font-size: ${fontSizes.lg};
  font-weight: ${fontWeights.semibold};
  color: ${colors.text.primary};
  margin: 0;
`;

export const PropertyUnits = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.text.secondary};
  margin: 0;
`;

export const PropertyActions = styled.div`
  display: flex;
  gap: ${spacing.sm};
`;

export const EditPropertyButton = styled.button`
  background: ${colors.primary};
  color: ${colors.text.inverted};
  padding: ${spacing.xs} ${spacing.sm};
  border: none;
  border-radius: ${borderRadius.sm};
  font-size: ${fontSizes.sm};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${colors.secondary};
  }
`;

export const DeletePropertyButton = styled.button`
  background: ${colors.error};
  color: ${colors.text.inverted};
  padding: ${spacing.xs} ${spacing.sm};
  border: none;
  border-radius: ${borderRadius.sm};
  font-size: ${fontSizes.sm};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;
