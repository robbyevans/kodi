// File: /web/src/components/HouseCard/HouseCard.tsx
import React from "react";

import { IHouse } from "../../redux/slices/houseSlice";
import * as S from "./styles";

interface HouseCardProps {
  house: IHouse;
}

const HouseCard: React.FC<HouseCardProps> = ({ house }) => {
  return (
    <S.CardContainer>
      <S.HouseTitle>House {house.house_number}</S.HouseTitle>
      <S.HouseDetail>Payable Rent: ${house.payable_rent}</S.HouseDetail>
      <S.HouseDetail>
        Status: {house.tenant?.name ? "Occupied" : "Vacant"}
      </S.HouseDetail>
    </S.CardContainer>
  );
};

export default HouseCard;
