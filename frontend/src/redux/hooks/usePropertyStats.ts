// File: /frontend/src/hooks/usePropertyStats.ts

import { useMemo } from "react";
import { useAppSelector } from "../hooks";
import { selectProperties } from "../selectors/propertySelectors";
import { IProperty } from "../slices/propertiesSlice";

// Extend your IProperty with additional computed stats
export interface IEnrichedProperty extends IProperty {
  estimatedRevenue: number; // Revenue if all houses are occupied
  currentRevenue: number; // Revenue from houses that are actually occupied
  revenuePercentage: number; // (currentRevenue / estimatedRevenue) * 100
  occupancyRate: number; // Percentage of houses that are occupied in this property
}

export interface PropertyStats {
  totalProperties: number;
  totalUnits: number;
  totalTenants: number;
  occupancyRatePerProperty: { propertyId: number; occupancyRate: number }[];
  enrichedProperties: IEnrichedProperty[];
  totalEstimatedRevenue: number;
  totalCurrentRevenue: number;
  totalRevenuePercentage: number; // (totalCurrentRevenue / totalEstimatedRevenue) * 100
}

const usePropertyStats = (): PropertyStats => {
  // Get properties from the Redux store
  const properties = useAppSelector(selectProperties) as IProperty[];

  return useMemo(() => {
    const totalProperties = properties.length;
    let totalUnits = 0;
    let totalTenants = 0;
    let totalEstimatedRevenue = 0;
    let totalCurrentRevenue = 0;
    const occupancyRatePerProperty: {
      propertyId: number;
      occupancyRate: number;
    }[] = [];

    const enrichedProperties: IEnrichedProperty[] = properties.map(
      (property) => {
        // Total number of houses (units) in this property
        const units = property.houses?.length || 0;
        totalUnits += units;

        // Count the number of houses that are occupied (i.e. have a tenant)
        const tenantsCount =
          property.houses?.filter((house) => house.tenant).length || 0;
        totalTenants += tenantsCount;

        // Calculate occupancy rate for this property
        const occupancyRate = units > 0 ? (tenantsCount / units) * 100 : 0;
        occupancyRatePerProperty.push({
          propertyId: property.id,
          occupancyRate,
        });

        // Estimated revenue if all houses are occupied
        const estimatedRevenue =
          property.houses?.reduce(
            (acc, house) => acc + parseFloat(house.payable_rent),
            0
          ) || 0;

        // Current revenue based on houses that are occupied
        const currentRevenue =
          property.houses?.reduce(
            (acc, house) =>
              acc + (house.tenant ? parseFloat(house.payable_rent) : 0),
            0
          ) || 0;

        // Revenue percentage: current revenue compared to full occupancy
        const revenuePercentage =
          estimatedRevenue > 0 ? (currentRevenue / estimatedRevenue) * 100 : 0;

        totalEstimatedRevenue += estimatedRevenue;
        totalCurrentRevenue += currentRevenue;

        return {
          ...property,
          estimatedRevenue,
          currentRevenue,
          revenuePercentage,
          occupancyRate,
        };
      }
    );

    // Overall revenue percentage across all properties when fully occupied
    const totalRevenuePercentage =
      totalEstimatedRevenue > 0
        ? (totalCurrentRevenue / totalEstimatedRevenue) * 100
        : 0;

    return {
      totalProperties,
      totalUnits,
      totalTenants,
      occupancyRatePerProperty,
      enrichedProperties,
      totalEstimatedRevenue,
      totalCurrentRevenue,
      totalRevenuePercentage,
    };
  }, [properties]);
};

export default usePropertyStats;
