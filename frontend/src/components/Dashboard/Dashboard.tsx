import React from "react";
import { FiPlus } from "react-icons/fi";
import QuickStatCard from "../StatCard/QuickStatCard"; // Import the new component
import * as S from "./styles";
import { IProperty } from "../../redux/slices/propertiesSlice";
import PropertyCard from "../PropertyCard/PropertyCard";

interface DashboardProps {
  data: IProperty[];
  navigate: (path: string) => void;
  handleAddPropertyClick: () => void;
  totalRevenuePercentage: number;
  totalProperties: number;
  formattedDate: string;
  formattedTime: string;
  totalUnits: number;
  occupancyRate: number;
}

const Dashboard: React.FC<DashboardProps> = ({
  data,
  handleAddPropertyClick,
  totalRevenuePercentage,
  totalProperties,
  formattedDate,
  formattedTime,
  totalUnits,
  occupancyRate,
}) => {
  return (
    <S.DashboardContainer>
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
                <PropertyCard propertyData={property} />
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
          <QuickStatCard
            totalProperties={totalProperties}
            totalUnits={totalUnits}
            occupancyRate={occupancyRate}
            totalRevenuePercentage={totalRevenuePercentage}
          />
        </S.SidePanel>
      </S.ContentWrapper>
    </S.DashboardContainer>
  );
};

export default Dashboard;
