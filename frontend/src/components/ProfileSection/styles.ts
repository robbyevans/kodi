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

export const ProfileContainer = styled.section`
  background: ${colors.neutral[100]};
  padding: ${spacing.xl};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  margin-bottom: ${spacing["2xl"]};
`;

export const ProfileHeader = styled.div`
  margin-bottom: ${spacing.lg};
  h2 {
    font-family: ${fonts.secondary};
    font-size: ${fontSizes["2xl"]};
    color: ${colors.primary};
    font-weight: ${fontWeights.semibold};
  }
`;

export const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.lg};
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: ${borderRadius.full};
  object-fit: cover;
  border: 4px solid ${colors.background};
  box-shadow: ${shadows.lg};
`;

export const ProfileDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DetailLabel = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.semibold};
  color: ${colors.primary};
  margin-bottom: ${spacing.xs};
`;

export const DetailValue = styled.div`
  font-size: ${fontSizes.base};
  font-weight: ${fontWeights.regular};
  color: ${colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.background};
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.md};
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

export const ChangeImageButton = styled.button`
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
