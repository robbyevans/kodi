import React, { useEffect, useState } from "react";
import * as S from "./styles";

interface MiniQuickStatCardProps {
  totalProperties: number;
  totalUnits: number;
  occupancyRate: number;
  paymentRate: number;
}

const useCountUp = (target: number, duration: number = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressRatio = Math.min(progress / duration, 1);
      setCount(Math.floor(progressRatio * target));
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return count;
};

const MiniQuickStatCard: React.FC<MiniQuickStatCardProps> = ({
  totalProperties,
  totalUnits,
  occupancyRate,
  paymentRate,
}) => {
  const animatedProperties = useCountUp(totalProperties, 1500);
  const animatedUnits = useCountUp(totalUnits, 1500);
  const animatedOcc = useCountUp(occupancyRate, 1500);
  const animatedPaymentRate = useCountUp(paymentRate, 1500);

  return (
    <S.MiniQuickStats data-testid="mini-quick-stats">
      <S.MiniStatItem>
        <span>Properties</span>
        <strong>{animatedProperties}</strong>
      </S.MiniStatItem>
      <S.MiniStatItem>
        <span>Units</span>
        <strong>{animatedUnits}</strong>
      </S.MiniStatItem>
      <S.MiniStatItem>
        <span>Occ%</span>
        <strong>{animatedOcc}%</strong>
      </S.MiniStatItem>
      <S.MiniStatItem>
        <span>Payment%</span>
        <strong>{animatedPaymentRate}%</strong>
      </S.MiniStatItem>
    </S.MiniQuickStats>
  );
};

export default MiniQuickStatCard;
