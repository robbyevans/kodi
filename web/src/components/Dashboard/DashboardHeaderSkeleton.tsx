import React from "react";
import * as S from "./styles";

const DashboardHeaderSkeleton: React.FC = () => {
  return (
    <S.DashboardHeader>
      <div>
        <S.SkeletonText $width="200px" $height="32px" $marginBottom="8px" />
        <S.SkeletonText $width="150px" $height="20px" />
      </div>
      <S.ProfileImageSkeleton />
    </S.DashboardHeader>
  );
};

export default DashboardHeaderSkeleton;
