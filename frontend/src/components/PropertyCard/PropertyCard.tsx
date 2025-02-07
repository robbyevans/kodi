import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import { IProperty } from "../../redux/slices/propertiesSlice";
import { getPropertyStats } from "../../helpers/utils/getPropertyStats";

interface PropertyCardProps {
  propertyData: IProperty;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ propertyData }) => {
  const navigate = useNavigate();
  const { totalUnits, occupancyRate } = getPropertyStats(propertyData);

  console.log("propertyData.property_image", propertyData.property_image);

  const imageURL =
    propertyData.property_image instanceof File
      ? URL.createObjectURL(propertyData.property_image)
      : propertyData.property_image || "src/assets/apartment-placeholder.png";

  return (
    <S.PropertyCard onClick={() => navigate(`/property/${propertyData.id}`)}>
      <S.PropertyImage $image={imageURL} />
      <S.PropertyInfo>
        <h3>{propertyData.name}</h3>
        <S.PropertyStats>
          <span>{totalUnits || 0} Units</span>
          <span>•</span>
          <span>Occupancy {occupancyRate}%</span>
        </S.PropertyStats>
      </S.PropertyInfo>
      <S.ViewDetailsButton>View Details →</S.ViewDetailsButton>
    </S.PropertyCard>
  );
};

export default PropertyCard;
