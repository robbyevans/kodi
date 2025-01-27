// File: /frontend/src/components/HouseCard/HouseCard.tsx
import React from "react";
import { House } from "../../redux/slices/houseSlice";
import * as S from "./styles";

interface HouseCardProps {
  house: House;
}

const HouseCard: React.FC<HouseCardProps> = ({ house }) => {
  return (
    <S.CardContainer>
      <S.HouseTitle>House {house.house_number}</S.HouseTitle>
      <S.HouseDetail>Payable Rent: ${house.payable_rent}</S.HouseDetail>
      <S.HouseDetail>
        Status: {house.tenant_id ? "Occupied" : "Vacant"}
      </S.HouseDetail>
    </S.CardContainer>
  );
};

export default HouseCard;
