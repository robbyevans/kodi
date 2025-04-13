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

export const ProfileContainer = styled.section`
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

export const ProfileHeader = styled.div`
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

export const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.lg};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${spacing.md};
  }
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: ${borderRadius.full};
  object-fit: cover;
  border: 4px solid ${colors.background};
  box-shadow: ${shadows.lg};

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const ProfileDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  width: 100%;
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

  @media (max-width: 768px) {
    font-size: ${fontSizes.sm};
    padding: ${spacing.sm} ${spacing.sm};
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
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
  -webkit-box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);
  box-shadow: 6px 5px 12px -7px rgba(0, 0, 0, 0.75);

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

const skeletonLoading = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const SkeletonBlock = styled.div<{
  width?: string;
  height?: string;
  marginBottom?: string;
  borderRadius?: string;
}>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "20px"};
  margin-bottom: ${({ marginBottom }) => marginBottom || "0"};
  border-radius: ${({ borderRadius }) => borderRadius || "4px"};
  background: #eee;
  background-image: linear-gradient(
    to right,
    #eee 0%,
    #f5f5f5 20%,
    #eee 40%,
    #eee 100%
  );
  background-size: 800px 104px;
  animation: ${skeletonLoading} 1.5s linear infinite;
`;
