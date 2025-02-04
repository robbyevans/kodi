import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import * as S from "./styles";

interface QuickStatCardProps {
  totalProperties: number;
  totalUnits: number;
  occupancyRate: number;
  totalRevenuePercentage: number;
}

const COLORS = ["#0088FE", "#00C49F"]; // Blue for collected revenue, Green for remaining

const QuickStatCard: React.FC<QuickStatCardProps> = ({
  totalProperties,
  totalUnits,
  occupancyRate,
  totalRevenuePercentage,
}) => {
  const data = [
    { name: "Collected Revenue", value: totalRevenuePercentage },
    { name: "Remaining Revenue", value: 100 - totalRevenuePercentage },
  ];

  return (
    <S.QuickStats>
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

      {/* Pie Chart */}
      <S.ChartContainer>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
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
    </S.QuickStats>
  );
};

export default QuickStatCard;
