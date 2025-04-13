import React from "react";
import * as S from "./styles";

const QuickStatCardSkeleton: React.FC = () => {
  return (
    <S.QuickStats data-testid="quick-stats-skeleton">
      {/* Skeleton for Chart Container */}
      <S.ChartContainer>
        <S.SkeletonBlock width="80px" height="80px" />
      </S.ChartContainer>
      {/* Skeleton for the card title */}
      <S.SkeletonBlock width="60%" height="24px" marginBottom="16px" />
      {/* Skeleton rows for each stat item */}
      <S.StatItem>
        <S.SkeletonBlock width="40%" height="16px" />
        <S.SkeletonBlock width="20%" height="16px" />
      </S.StatItem>
      <S.StatItem>
        <S.SkeletonBlock width="40%" height="16px" />
        <S.SkeletonBlock width="20%" height="16px" />
      </S.StatItem>
      <S.StatItem>
        <S.SkeletonBlock width="40%" height="16px" />
        <S.SkeletonBlock width="20%" height="16px" />
      </S.StatItem>
      <S.StatItem>
        <S.SkeletonBlock width="40%" height="16px" />
        <S.SkeletonBlock width="20%" height="16px" />
      </S.StatItem>
      <S.StatItem>
        <S.SkeletonBlock width="40%" height="16px" />
        <S.SkeletonBlock width="20%" height="16px" />
      </S.StatItem>
    </S.QuickStats>
  );
};

export default QuickStatCardSkeleton;
