import React from "react";
import { FiPlus } from "react-icons/fi";
import Sidebar from "../Sidebar/Sidebar";
import * as S from "./styles";
import { IProperty } from "../../redux/slices/propertiesSlice";

interface DashboardProps {
  data: IProperty[];
  navigate: (path: string) => void;
  handleAddPropertyClick: () => void;
  totalRevenuePercentage:number;
  totalProperties: number;
  formattedDate: string;
  formattedTime: string;
  totalUnits: number;
  occupancyRate: number;
}

const Dashboard: React.FC<DashboardProps> = ({
  data,
  navigate,
  handleAddPropertyClick,
  totalProperties,
  formattedDate,
  formattedTime,
  totalUnits,
  occupancyRate,
}) => {
  return (
    <S.DashboardContainer>
      <Sidebar />
      <S.DashboardWrapper>
        <S.DashboardHeader>
          <div>
            <h1>Dashboard</h1>
            <p>Find your property listing and stats below</p>
          </div>
          <p>Date: {formattedDate}</p>
          <p>Time: {formattedTime}</p>
        </S.DashboardHeader>

        <S.ContentWrapper>
          <S.PropertyListContainer>
            <S.PropertyListHeader>
              <h2>Your Properties</h2>
              <S.AddPropertyButton onClick={handleAddPropertyClick}>
                <FiPlus />
                Add Property
              </S.AddPropertyButton>
            </S.PropertyListHeader>

            {data?.length > 0 ? (
              <S.PropertyGrid>
                {data.map((property) => (
                  <S.PropertyCard
                    key={property.id}
                    onClick={() => navigate(`/property/${property.id}`)}
                  >
                    <S.PropertyImage />
                    <S.PropertyInfo>
                      <h3>{property.name}</h3>
                      <S.PropertyStats>
                        <span>{property.houses?.length || 0} Units</span>
                        <span>•</span>
                        <span>KSH 1,200,000 Revenue</span>
                      </S.PropertyStats>
                    </S.PropertyInfo>
                    <S.ViewDetailsButton>View Details →</S.ViewDetailsButton>
                  </S.PropertyCard>
                ))}
              </S.PropertyGrid>
            ) : (
              <S.EmptyState>
                <h3>No Properties Found</h3>
                <p>Start by adding your first property</p>
                <S.AddPropertyButton onClick={handleAddPropertyClick}>
                  <FiPlus />
                  Add Property
                </S.AddPropertyButton>
              </S.EmptyState>
            )}
          </S.PropertyListContainer>

          <S.SidePanel>
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
            </S.QuickStats>
          </S.SidePanel>
        </S.ContentWrapper>
      </S.DashboardWrapper>
    </S.DashboardContainer>
  );
};

export default Dashboard;
