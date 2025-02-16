import React from "react";
import styled from "styled-components";
import {
  colors,
  spacing,
  borderRadius,
  shadows,
} from "../../styles/foundation";

const SkeletonWrapper = styled.div`
  background: ${colors.background};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.sm};
  padding: ${spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 150px;
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

const SkeletonText = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
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

const PropertyCardSkeleton: React.FC = () => {
  return (
    <SkeletonWrapper>
      <SkeletonImage />
      <SkeletonText width="80%" height="20px" />
      <SkeletonText width="60%" height="16px" />
    </SkeletonWrapper>
  );
};

export default PropertyCardSkeleton;
