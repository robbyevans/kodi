import { IProperty } from "../../redux/slices/propertiesSlice";

// Compute property statistics including additional metrics
export const getPropertyStats = (propertyData: IProperty | IProperty[]) => {
  const properties = Array.isArray(propertyData)
    ? propertyData
    : [propertyData];

  let totalUnits = 0;
  let totalTenants = 0;
  let currentPayableRevenue = 0;
  let totalPayableRevenue = 0;
  let totalUnitsPaid = 0;

  properties.forEach((property) => {
    if (property.houses && Array.isArray(property.houses)) {
      totalUnits += property.houses.length;

      property.houses.forEach((house) => {
        const rent =
          typeof house.payable_rent === "string"
            ? parseFloat(house.payable_rent) || 0
            : house.payable_rent || 0;

        totalPayableRevenue += rent;

        if (house.tenant) {
          totalTenants++;
          currentPayableRevenue += rent;
        }
        const agreement = house?.active_tenant_house_agreements;
        if (agreement && agreement[0]?.balance >= 0) {
          totalUnitsPaid++;
        }
      });
    }
  });

  const occupancyRate = totalUnits > 0 ? (totalTenants / totalUnits) * 100 : 0;
  const currentRevenueRate =
    totalPayableRevenue > 0
      ? (currentPayableRevenue / totalPayableRevenue) * 100
      : 0;

  // New metrics: Average Rent & Vacancy Rate
  const averageRent = totalUnits > 0 ? totalPayableRevenue / totalUnits : 0;
  const vacancyRate = 100 - occupancyRate;
  const paymentRate = totalUnits > 0 ? (totalUnitsPaid / totalUnits) * 100 : 0;

  return {
    totalUnits,
    totalTenants,
    occupancyRate: parseFloat(occupancyRate.toFixed(2)),
    currentPayableRevenue: parseFloat(currentPayableRevenue.toFixed(2)),
    totalPayableRevenue: parseFloat(totalPayableRevenue.toFixed(2)),
    paymentRate: parseFloat(paymentRate.toFixed(2)),
    currentRevenueRate: parseFloat(currentRevenueRate.toFixed(2)),
    averageRent: parseFloat(averageRent.toFixed(2)),
    vacancyRate: parseFloat(vacancyRate.toFixed(2)),
  };
};
