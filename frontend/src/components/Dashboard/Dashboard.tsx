import React from "react";
import { FiPlus } from "react-icons/fi";
import QuickStatCard from "../StatCard/QuickStatCard"; // Import the new component
import * as S from "./styles";
import { IProperty } from "../../redux/slices/propertiesSlice";
import PropertyCard from "../PropertyCard/PropertyCard";
import { IUser } from "../../redux/slices/adminSlice";
import profilePlaceholder from "../../assets/profile-placeholder-preview.png";

interface DashboardProps {
  propertyData: IProperty[];
  userData: IUser;
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
  handleAddPropertyClick,
  totalRevenuePercentage,
  totalProperties,
  totalUnits,
  occupancyRate,
}) => {
  const imageURL =
    userData?.profile_image instanceof File
      ? URL.createObjectURL(userData.profile_image)
      : profilePlaceholder;

  console.log(
    "URL.createObjectURL(userData.profile_image)",
    userData?.profile_image
  );

  return (
    <S.DashboardContainer>
      <S.DashboardHeader>
        <div>
          <h1>Dashboard</h1>
          <p>Find your property listing and stats below</p>
        </div>
        <S.ProfileImage alt="profile-picture" src={imageURL} />
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

          {propertyData?.length > 0 ? (
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
