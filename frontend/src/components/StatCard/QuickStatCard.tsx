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

const COLORS = ["#F17F1E", colors.primary];

const QuickStatCard: React.FC<QuickStatCardProps> = ({
  totalProperties,
  totalUnits,
  occupancyRate,
  totalRevenuePercentage,
}) => {
  const data = [
    { name: "Current Payable Revenue", value: totalRevenuePercentage },
    { name: "Vacant Units Revenue", value: 100 - totalRevenuePercentage },
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
              labelLine={false}
              label={({ cx, cy }) => (
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#F17F1E"
                  fontSize={16}
                  fontWeight="bold"
                >
                  {`${totalRevenuePercentage}%`}
                </text>
              )}
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
