// File: /frontend/src/components/HouseCard/HouseCard.tsx

import React from "react";
import { House } from "../../redux/slices/houseSlice"; // Import the House interface

// Adjust the props to use 'house' as the variable name, and typed it properly
interface HouseCardProps {
  house: House; // Correctly typing the props
}

const HouseCard: React.FC<HouseCardProps> = ({ house }) => {
  return (
    <div>
      <h3>House {house.house_number}</h3>
      <p>Payable Rent: ${house.payable_rent}</p>
      <p>Status: {house.tenant_id ? "Occupied" : "Vacant"}</p>
    </div>
  );
};

export default HouseCard;
