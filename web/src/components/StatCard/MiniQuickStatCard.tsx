import React from "react";
import * as S from "./styles";

interface MiniQuickStatCardProps {
  totalProperties: number;
  totalUnits: number;
  occupancyRate: number;
}

const MiniQuickStatCard: React.FC<MiniQuickStatCardProps> = ({
  totalProperties,
  totalUnits,
  occupancyRate,
}) => {
  return (
    <S.MiniQuickStats data-testid="mini-quick-stats">
      <S.MiniStatItem>
        <span>Properties</span>
        <strong>{totalProperties}</strong>
      </S.MiniStatItem>
      <S.MiniStatItem>
        <span>Units</span>
        <strong>{totalUnits}</strong>
      </S.MiniStatItem>
      <S.MiniStatItem>
        <span>Occ%</span>
        <strong>{occupancyRate}%</strong>
      </S.MiniStatItem>
    </S.MiniQuickStats>
  );
};

export default MiniQuickStatCard;
