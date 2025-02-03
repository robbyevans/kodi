import { useEffect } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { useProperties } from "../redux/hooks/useProperties";

import * as S from "../components/PropertyPage/styles";
import PropertyPage from "../components/PropertyPage/PropertyPage";

const PropertyContainer = () => {
  const {
    getPropertyById,
    data: propertyData,
    loading,
    error,
  } = useProperties();

  const { propertyId } = useParams<{ propertyId: string }>();

  useEffect(() => {
    if (propertyId) {
      getPropertyById(Number(propertyId));
    }
  }, [propertyId]);

  const selectedProperty = propertyData.find(
    (property) => property.id === Number(propertyId)
  );

  const houses = selectedProperty?.houses || [];

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableData = houses.map((house) => [
      house.house_number,
      house.tenant?.name || "Vacant",
      house.tenant?.phone_number || "Vacant",
      house.payable_rent,
    ]);

    doc.autoTable({
      head: [["House Number", "Tenant Name", "Tenant Contact", "Payable Rent"]],
      body: tableData,
    });

    const monthYear = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    doc.save(`${monthYear}-Rent-Payment.pdf`);
  };

  return (
    <S.PropertyPageContainer>
      <PropertyPage
        houses={houses}
        propertyName={selectedProperty?.name || ""}
        loading={loading}
        error={error}
        propertyId={Number(propertyId)}
        downloadPDF={downloadPDF}
      />
    </S.PropertyPageContainer>
  );
};

export default PropertyContainer;
