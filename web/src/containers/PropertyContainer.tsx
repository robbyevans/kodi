import React, { useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useProperties } from "../redux/hooks/useProperties";
import PropertyPage from "../components/PropertyPage/PropertyPage";
import * as S from "../components/PropertyPage/styles";
import { IHouse } from "../redux/slices/houseSlice";

const PropertyContainer: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  console.log("propertyId", propertyId);

  const {
    getPropertyById,
    data: propertyData,
    loading,
    error,
  } = useProperties();

  console.log("propertyData", propertyData);

  useEffect(() => {
    if (propertyId) {
      getPropertyById(Number(propertyId));
    }
  }, [propertyId]);

  const selectedProperty = useMemo(
    () => propertyData.find((p) => p.id === Number(propertyId)),
    [propertyData, propertyId]
  );

  const houses: IHouse[] = selectedProperty?.houses ?? [];

  const downloadPDF = useCallback(() => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
    });

    const tableHeaders = [
      "House Number",
      "Status",
      "Tenant Name",
      "Tenant Contact",
      "Payable Rent",
      "Payable Deposit",
      "Balance",
      "Account Number",
    ];

    const tableData = houses.map((house) => {
      const agreement = house.active_tenant_house_agreements?.[0];
      const tenant = house.tenant;

      return [
        house.house_number || "N/A",
        agreement?.status_label
          ? ["Settled", "Credit"].includes(agreement.status_label)
            ? `✅ ${agreement.status_label}`
            : `❌ ${agreement.status_label}`
          : "Vacant",

        tenant?.name || "Vacant",
        tenant?.phone_number || "N/A",
        house.payable_rent?.toString() || "N/A",
        house.payable_deposit?.toString() || "N/A",
        agreement?.balance?.toString() ?? "N/A",
        house.account_number || "N/A",
      ];
    });

    doc.setFontSize(14);
    doc.text(
      `Property Report - ${selectedProperty?.name || "Property"}`,
      30,
      30
    );

    (doc as any).autoTable({
      startY: 50,
      head: [tableHeaders],
      body: tableData,
    });

    doc.save(`Property-${selectedProperty?.name || "Details"}.pdf`);
  }, [houses, selectedProperty]);

  return (
    <S.PropertyPageContainer>
      <PropertyPage
        houses={houses}
        propertyName={selectedProperty?.name || ""}
        isPropertyLoading={loading}
        error={error}
        propertyId={Number(propertyId)}
        downloadPDF={downloadPDF}
      />
    </S.PropertyPageContainer>
  );
};

export default PropertyContainer;
