import React from "react";
import * as S from "./styles";

const MiniQuickStatCardSkeleton: React.FC = () => {
  return (
    <S.MiniQuickStats data-testid="mini-quick-stats-skeleton">
      <S.MiniStatItem>
        <S.SkeletonBlock width="50%" height="14px" marginBottom="4px" />
        <S.SkeletonBlock width="40%" height="20px" />
      </S.MiniStatItem>
      <S.MiniStatItem>
        <S.SkeletonBlock width="40%" height="14px" marginBottom="4px" />
        <S.SkeletonBlock width="30%" height="20px" />
      </S.MiniStatItem>
      <S.MiniStatItem>
        <S.SkeletonBlock width="30%" height="14px" marginBottom="4px" />
        <S.SkeletonBlock width="30%" height="20px" />
      </S.MiniStatItem>
      <S.MiniStatItem>
        <S.SkeletonBlock width="50%" height="14px" marginBottom="4px" />
        <S.SkeletonBlock width="40%" height="20px" />
      </S.MiniStatItem>
    </S.MiniQuickStats>
  );
};

export default MiniQuickStatCardSkeleton;
