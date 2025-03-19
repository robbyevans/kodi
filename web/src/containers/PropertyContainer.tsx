import React, { useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useProperties } from "../redux/hooks/useProperties";
import { usePayments } from "../redux/hooks/usePayment";
import PropertyPage from "../components/PropertyPage/PropertyPage";
import * as S from "../components/PropertyPage/styles";

const PropertyContainer: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();

  const {
    getPropertyById,
    data: propertyData,
    loading,
    error,
  } = useProperties();

  const { data: payments, getPaymentsByProperty } = usePayments();

  // First, fetch the property using its id from the URL.
  useEffect(() => {
    if (propertyId) {
      getPropertyById(Number(propertyId));
    }
  }, [propertyId]);

  // Once the property is fetched (and its unique_id is set), fetch its payments.
  const selectedProperty = useMemo(
    () => propertyData.find((property) => property.id === Number(propertyId)),
    [propertyData, propertyId]
  );
  useEffect(() => {
    if (selectedProperty && selectedProperty.unique_id) {
      // Call getPaymentsByProperty using the unique_id (a string)
      getPaymentsByProperty(selectedProperty.unique_id);
    }
  }, [selectedProperty]);

  const houses = selectedProperty?.houses || [];

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // For each house, compute payment-related data.
  const computedHouses = useMemo(() => {
    return houses.map((house) => {
      // Find current payment for this house (for current month and year)
      const currentPayment = payments.find((payment) => {
        const paymentDate = new Date(payment.payment_date);
        return (
          payment.property_id === selectedProperty?.unique_id &&
          payment.house_number === house.house_number &&
          paymentDate.getMonth() + 1 === currentMonth &&
          paymentDate.getFullYear() === currentYear
        );
      });
      const rentPaid = currentPayment
        ? Number(currentPayment.transaction_amount)
        : 0;
      const payableRent = house.payable_rent ? Number(house.payable_rent) : 0;
      const balance = payableRent - rentPaid;
      const status = currentPayment && balance === 0 ? "✅" : "❌";
      return {
        ...house,
        rentPaid,
        balance,
        paymentDate: currentPayment
          ? new Date(currentPayment.payment_date)
          : null,
        paymentMode: "mpesa",
        paymentStatus: status,
      };
    });
  }, [houses, payments, selectedProperty, currentMonth, currentYear]);

  // Calculate total rent paid (for current payments)
  const totalRentPaid = useMemo(() => {
    return houses.reduce((acc, house) => {
      const currentPayment = payments.find((payment) => {
        const paymentDate = new Date(payment.payment_date);
        return (
          payment.property_id === selectedProperty?.unique_id &&
          payment.house_number === house.house_number &&
          paymentDate.getMonth() + 1 === currentMonth &&
          paymentDate.getFullYear() === currentYear
        );
      });
      return (
        acc + (currentPayment ? Number(currentPayment.transaction_amount) : 0)
      );
    }, 0);
  }, [houses, payments, selectedProperty, currentMonth, currentYear]);

  // PDF Download function (unchanged)
  const downloadPDF = useCallback(() => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
    });
    const marginLeft = 30;
    const marginRight = 30;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const bottomMargin = 30;
    const monthName = new Date().toLocaleString("default", { month: "long" });
    const yearNum = new Date().getFullYear();
    const companyName = `@ KODI PMS`;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(45, 106, 79);
    doc.setFontSize(8);
    doc.text(
      companyName,
      pageWidth - marginRight - 100,
      pageHeight - bottomMargin
    );

    const title = `Rent payment for ${
      selectedProperty?.name || "Property Details"
    }, ${monthName}, ${yearNum}`;
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    const titleWidth = doc.getTextWidth(title);
    const centerX = (pageWidth - titleWidth) / 2;
    doc.text(title, centerX, 50);

    const tableHeaders = [
      "House Number",
      "Tenant Name",
      "Tenant Contact",
      "Payable Deposit",
      "Deposit Paid",
      "Deposit Balance",
      "Payable Rent",
      "Rent Paid",
      "Balance",
      "Date of Payment",
      "Mode of Payment",
      "Status",
      "Account Number",
    ];
    const tableData = computedHouses.map((house) => {
      const payableDeposit = house.payable_deposit ?? "";
      const depositPaid = house.tenant?.house_deposit_paid ?? "";
      const depositBalance =
        house.payable_deposit != null &&
        house.tenant?.house_deposit_paid != null
          ? house.payable_deposit - house.tenant.house_deposit_paid
          : "";
      const payableRent = house.payable_rent ?? "";
      const rentPaid = house.rentPaid || "";
      const balance = house.balance || "";
      const dateOfPayment = house.paymentDate
        ? house.paymentDate.toLocaleDateString()
        : "";
      const modeOfPayment = house.paymentMode || "";
      const status = house.paymentStatus;
      const accountNumber = house.account_number;
      return [
        house.house_number || "",
        house.tenant?.name || "Vacant",
        house.tenant?.phone_number || "Vacant",
        payableDeposit,
        depositPaid,
        depositBalance,
        payableRent,
        rentPaid,
        balance,
        dateOfPayment,
        modeOfPayment,
        status,
        accountNumber,
      ];
    });

    (doc as any).autoTable({
      startY: 90,
      head: [tableHeaders],
      body: tableData,
    });

    const formattedDate = new Date().toLocaleString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const finalY = (doc as any).lastAutoTable.finalY || 90;
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate}`, marginLeft, finalY + 30);
    doc.text("Approved By: _______________", marginLeft, finalY + 55);
    doc.text("Date: _______________", marginLeft, finalY + 75);
    doc.text("Signature: _______________", marginLeft, finalY + 95);

    doc.save(`${formattedDate}-Property-Details.pdf`);
  }, [computedHouses, selectedProperty, totalRentPaid]);

  return (
    <S.PropertyPageContainer>
      <PropertyPage
        houses={computedHouses}
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
