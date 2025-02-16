import React from "react";
import { FiPlus } from "react-icons/fi";
import QuickStatCard from "../StatCard/QuickStatCard";
import * as S from "./styles";
import { IProperty } from "../../redux/slices/propertiesSlice";
import PropertyCard from "../PropertyCard/PropertyCard";
import PropertyCardSkeleton from "../PropertyCard/PropertyCardSkeleton";
import DashboardHeaderSkeleton from "./DashboardHeaderSkeleton";
import { IUser } from "../../redux/slices/adminSlice";
import profilePlaceholder from "../../assets/profile-placeholder-preview.png";

interface DashboardProps {
  propertyData: IProperty[];
  userData: IUser;
  loading: boolean;
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
  propertyData,
  userData,
  loading,
  handleAddPropertyClick,
  totalRevenuePercentage,
  totalProperties,
  totalUnits,
  occupancyRate,
}) => {
  return (
    <S.DashboardContainer>
      {loading ? (
        <DashboardHeaderSkeleton />
      ) : (
        <S.DashboardHeader>
          <div>
            <h1>Dashboard</h1>
            <p>Find your property listing and stats below</p>
          </div>
          <S.ProfileImage
            alt="profile-image"
            src={
              typeof userData.profile_image === "string"
                ? userData.profile_image
                : profilePlaceholder
            }
          />
        </S.DashboardHeader>
      )}

      <S.ContentWrapper>
        <S.PropertyListContainer>
          <S.PropertyListHeader>
            <h2>Your Properties</h2>
            <S.AddPropertyButton onClick={handleAddPropertyClick}>
              <FiPlus />
              Add Property
            </S.AddPropertyButton>
          </S.PropertyListHeader>

          {loading ? (
            <S.PropertyGrid>
              <PropertyCardSkeleton />
              <PropertyCardSkeleton />
              <PropertyCardSkeleton />
            </S.PropertyGrid>
          ) : propertyData?.length > 0 ? (
            <S.PropertyGrid>
              {propertyData.map((property) => (
                <PropertyCard key={property.id} propertyData={property} />
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
