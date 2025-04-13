import React from "react";
import * as S from "./styles";

const PropertyListingSkeleton: React.FC = () => {
  return (
    <S.PropertyListingSkeletonContainer data-testid="property-listing-skeleton">
      <S.SkeletonHeader />
      <S.PropertiesSkeletonList>
        {[1, 2, 3, 4, 5].map((item) => (
          <S.PropertySkeletonItem key={item}>
            <S.SkeletonCircle />
            <S.SkeletonTextWrapper>
              <S.SkeletonText width="50%" />
              <S.SkeletonText width="30%" />
            </S.SkeletonTextWrapper>
          </S.PropertySkeletonItem>
        ))}
      </S.PropertiesSkeletonList>
    </S.PropertyListingSkeletonContainer>
  );
};

export default PropertyListingSkeleton;
