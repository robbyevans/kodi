import { IProperty } from "../../redux/slices/propertiesSlice";

// Unified function to handle both single property and multiple properties
export const getPropertyStats = (propertyData: IProperty | IProperty[]) => {
  // Normalize input to always be an array
  const properties = Array.isArray(propertyData)
    ? propertyData
    : [propertyData];

  // Initialize counters
  let totalUnits = 0;
  let totalTenants = 0;
  let currentPayableRevenue = 0;
  let totalPayableRevenue = 0;

  // Iterate through each property
  properties.forEach((property) => {
    if (property.houses && Array.isArray(property.houses)) {
      totalUnits += property.houses.length;

      property.houses.forEach((house) => {
        // Ensure payable_rent is treated as a number
        const rent =
          typeof house.payable_rent === "string"
            ? parseFloat(house.payable_rent) || 0
            : house.payable_rent || 0;

        totalPayableRevenue += rent;

        if (house.tenant) {
          totalTenants++;
          currentPayableRevenue += rent;
        }
      });
    }
  });

  // Calculate occupancy rate and current revenue rate
  const occupancyRate = totalUnits > 0 ? (totalTenants / totalUnits) * 100 : 0;
  const currentRevenueRate =
    totalPayableRevenue > 0
      ? (currentPayableRevenue / totalPayableRevenue) * 100
      : 0;

  // Return the aggregated statistics
  return {
    totalUnits, // Total number of houses
    totalTenants, // Total occupied houses
    occupancyRate, // Overall occupancy rate
    currentPayableRevenue, // Total revenue from occupied houses
    totalPayableRevenue, // Total possible revenue from all houses
    currentRevenueRate, // Percentage of revenue collected from occupied houses
  };
};
