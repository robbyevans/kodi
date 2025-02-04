import { IProperty } from "../../redux/slices/propertiesSlice";

export const getPropertyStats = (properties: IProperty[]) => {
  const totalProperties = properties.length;

  let totalUnits = 0;
  let totalTenants = 0;
  let totalRevenueIfFullyOccupied = 0;
  let totalCurrentRevenue = 0;

  const propertyStats = properties.map((property) => {
    const houses = property.houses || [];

    const totalUnitsInProperty = houses.length;
    const occupiedUnits = houses.filter((house) => house?.tenant).length;
    const totalRevenue = houses.reduce(
      (sum, house) => sum + (house?.payable_rent || 0),
      0
    );
    const currentRevenue = houses
      .filter((house) => house?.tenant)
      .reduce((sum, house) => sum + (house?.payable_rent || 0), 0);

    totalUnits += totalUnitsInProperty;
    totalTenants += occupiedUnits;
    totalRevenueIfFullyOccupied += totalRevenue;
    totalCurrentRevenue += currentRevenue;

    return {
      propertyId: property.id,
      name: property.name,
      totalUnits: totalUnitsInProperty,
      totalTenants: occupiedUnits,
      occupancyRate: totalUnitsInProperty
        ? (occupiedUnits / totalUnitsInProperty) * 100
        : 0,
      estimatedRevenue: totalRevenue,
      currentRevenue,
      revenuePercentage: totalRevenue
        ? (currentRevenue / totalRevenue) * 100
        : 0,
    };
  });

  return {
    totalProperties,
    totalUnits,
    totalTenants,
    occupancyRate: totalUnits > 0 ? (totalTenants / totalUnits) * 100 : 0,
    totalRevenueIfFullyOccupied,
    totalCurrentRevenue,
    totalRevenuePercentage:
      totalRevenueIfFullyOccupied > 0
        ? (totalCurrentRevenue / totalRevenueIfFullyOccupied) * 100
        : 0,
    propertyStats,
  };
};
