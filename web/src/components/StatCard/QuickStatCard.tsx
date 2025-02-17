import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import * as S from "./styles";
import { colors } from "../../styles/foundation";

interface QuickStatCardProps {
  totalProperties: number;
  totalUnits: number;
  occupancyRate: number;
  totalRevenuePercentage: number;
  totalTenants: number;
  averageRent: number;
  vacancyRate: number;
}

const COLORS = [colors.primary, "#F17F1E"];

const QuickStatCard: React.FC<QuickStatCardProps> = ({
  totalProperties,
  totalUnits,
  occupancyRate,
  totalRevenuePercentage,
  totalTenants,
  averageRent,
  vacancyRate,
}) => {
  const data = [
    { name: "Collected Revenue", value: totalRevenuePercentage },
    { name: "Pending Revenue", value: 100 - totalRevenuePercentage },
  ];

  return (
    <S.QuickStats data-testid="quick-stats-container">
      <S.ChartContainer>
        <ResponsiveContainer width="100%" height={120}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={50}
              dataKey="value"
              labelLine={false}
              label={({ cx, cy }) => (
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={colors.text.primary}
                  fontSize={16}
                  fontWeight="bold"
                >
                  {`${totalRevenuePercentage}%`}
                </text>
              )}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </S.ChartContainer>
      <h3>Quick Stats</h3>
      <S.StatItem>
        <span>Total Properties</span>
        <strong>{totalProperties}</strong>
      </S.StatItem>
      <S.StatItem>
        <span>Total Units</span>
        <strong>{totalUnits}</strong>
      </S.StatItem>
      <S.StatItem>
        <span>Occupied Units</span>
        <strong>{totalTenants}</strong>
      </S.StatItem>
      <S.StatItem>
        <span>Vacancy Rate</span>
        <strong>{vacancyRate}%</strong>
      </S.StatItem>
      <S.StatItem>
        <span>Occupancy Rate</span>
        <strong>{occupancyRate}%</strong>
      </S.StatItem>
      <S.StatItem>
        <span>Average Rent</span>
        <strong>${averageRent.toLocaleString()}</strong>
      </S.StatItem>
    </S.QuickStats>
  );
};

export default QuickStatCard;
