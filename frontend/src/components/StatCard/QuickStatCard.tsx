import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import * as S from "./styles";
import { colors } from "../../styles/foundation";

interface QuickStatCardProps {
  totalProperties: number;
  totalUnits: number;
  occupancyRate: number;
  totalRevenuePercentage: number;
}

const COLORS = ["#0088FE", colors.primary]; // Blue for collected revenue, Green for remaining

const QuickStatCard: React.FC<QuickStatCardProps> = ({
  totalProperties,
  totalUnits,
  occupancyRate,
  totalRevenuePercentage,
}) => {
  const data = [
    { name: "Collected Revenue", value: 50 },
    { name: "Remaining Revenue", value: 100 - totalRevenuePercentage },
  ];

  return (
    <S.QuickStats data-testid="quick-start-container">
      {/* Pie Chart */}
      <S.ChartContainer>
        <ResponsiveContainer width="100%" height={100}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={50}
              fill="#8884d8"
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
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
        <span>Occupancy Rate</span>
        <strong>{occupancyRate}%</strong>
      </S.StatItem>
    </S.QuickStats>
  );
};

export default QuickStatCard;
