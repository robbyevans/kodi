// File: /frontend/src/components/PropertyPage/PropertyPage.tsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHouses } from "../../redux/hooks/useHouses";
import { useProperties } from "../../redux/hooks/useProperties";
import HouseCard from "../HouseCard/HouseCard";
import * as S from "./styles";

const PropertyPage = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { houses, getPropertyHouses, loading, error } = useHouses();
  const { getPropertyById, data } = useProperties();

  useEffect(() => {
    if (propertyId) {
      getPropertyById(Number(propertyId));
      getPropertyHouses(Number(propertyId));
    }
  }, []);

  if (loading) return <S.LoadingMessage>Loading houses...</S.LoadingMessage>;
  if (error) return <S.ErrorMessage>{error}</S.ErrorMessage>;

  return (
    <S.PropertyPageContainer>
      <S.Header>Houses for {data[0]?.name}</S.Header>
      <S.HousesContainer>
        {houses &&
          houses.map((house) => <HouseCard key={house.id} house={house} />)}
      </S.HousesContainer>
    </S.PropertyPageContainer>
  );
};

export default PropertyPage;
