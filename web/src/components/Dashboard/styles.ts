import styled from "styled-components";
import {
  colors,
  fonts,
  fontSizes,
  spacing,
  shadows,
  borderRadius,
} from "../../styles/foundation";
import TestimonialsBackground from "../../assets/Testimonials Background.png";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.neutral[100]};
  overflow-y: auto;
  padding: ${spacing.md};
  min-height: 100vh;
`;

export const DashboardHeader = styled.header`
  margin-bottom: ${spacing.xl};
  padding: ${spacing.lg};
  background-image: url(${TestimonialsBackground});
  background-position: center;
  background-repeat: repeat;
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.text.inverted};

  .header-content {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-family: ${fonts.secondary};
    font-size: ${fontSizes["3xl"]};
    margin-bottom: ${spacing.sm};
  }

  p {
    font-size: ${fontSizes.lg};
    margin: 0;
  }
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.xl};

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 320px;
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
  gap: ${spacing.sm};
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

export const AddPropertyButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  color: ${colors.text.inverted};
  padding: ${spacing.sm} ${spacing.md};
  border: none;
  border-radius: ${borderRadius.md};
  font-size: ${fontSizes.md};
  cursor: pointer;
  transition: all 0.2s ease;

  .button-text {
    display: inline;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.sm};
  }

  @media (max-width: 768px) {
    .button-text {
      display: none;
    }
    padding: ${spacing.sm};
  }
`;

export const SidePanel = styled.aside`
  background: ${colors.background};
  padding: ${spacing.lg};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  height: fit-content;

  @media (max-width: 1020px) {
    display: none;
  }
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

export const ProfileImage = styled.img`
  border: 2px solid ${colors.text.inverted};
  border-radius: 50%;
  width: 55px;
  height: 55px;
  object-fit: cover;
  object-position: center;
  display: none;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    display: block;
  }
`;

// Reusable skeleton animations
export const Skeleton = styled.div`
  background: #e0e0e0;
  border-radius: ${borderRadius.sm};
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const SkeletonText = styled(Skeleton)<{
  $width: string;
  $height: string;
  $marginBottom?: string;
}>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  margin-bottom: ${(props) => props.$marginBottom || "0"};
`;

export const ProfileImageSkeleton = styled(Skeleton)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const MobileStatsContainer = styled.div`
  display: block;
  margin-top: ${spacing.lg};

  @media (min-width: 1020px) {
    display: none;
  }
`;
