import React, { useState, useEffect } from "react";
import * as S from "./styles";

const points = [
  "Manage properties effortlessly",
  "Real-time rent payment tracking",
  "Easy integration with your workflow",
  "Advanced reporting and analytics",
];

const RotatingPoints: React.FC = () => {
  // Start with no active index to delay the first animation cycle.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    // Delay the initial activation slightly to allow a smooth start.
    const timeout = setTimeout(() => {
      setActiveIndex(0);
      interval = setInterval(() => {
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev + 1) % points.length
        );
      }, 2000);
    }, 10);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <S.InfoFeatures>
      {points.map((point, index) => (
        <S.InfoPoint key={index} active={index === activeIndex}>
          {point}
        </S.InfoPoint>
      ))}
    </S.InfoFeatures>
  );
};

export default RotatingPoints;
