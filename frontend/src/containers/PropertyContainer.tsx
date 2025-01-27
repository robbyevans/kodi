import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { useProperties } from "../redux/hooks/useProperties";
import { useHouses } from "../redux/hooks/useHouses";
import {
  sendTextMessage,
  sendEmailReceipt,
} from "../components/Utils/notifications";
import * as S from "../components/PropertyPage/styles";
import PropertyPage from "../components/PropertyPage/PropertyPage";

const PropertyContainer = () => {
  const { houses, getPropertyHouses, loading, error } = useHouses();
  const { getPropertyById } = useProperties();
  const [paymentData, setPaymentData] = useState<any[]>([]);
  const { propertyId } = useParams<{ propertyId: string }>();

  // Fetch property and houses on component mount
  useEffect(() => {
    if (propertyId) {
      getPropertyById(Number(propertyId));
      getPropertyHouses(Number(propertyId));
    }
  }, [propertyId]);

  // Fetch Mpesa payments for each house
  useEffect(() => {
    const fetchPayments = async () => {
      if (houses.length > 0) {
        const paymentPromises = houses.map((house) =>
          axios.get(`/api/mpesa/${house.id}`).then((response) => {
            const payment = response.data.payment;
            updateHouseRentPayment(house.id, payment);
          })
        );
        await Promise.all(paymentPromises);
      }
    };

    fetchPayments();
  }, [houses]);

  // Update rent payment and notify tenant
  const updateHouseRentPayment = (houseId: number, payment: any) => {
    const houseToUpdate = houses.find((house) => house.id === houseId);

    if (houseToUpdate && houseToUpdate.tenant) {
      const newBalance = houseToUpdate.payable_rent - payment?.amount;

      const updatedPayment = {
        houseNumber: houseToUpdate.house_number,
        tenantName: houseToUpdate.tenant.name,
        tenantContact: houseToUpdate.tenant.phone_number,
        payableRent: houseToUpdate.payable_rent,
        rentPaid: payment?.amount,
        balance: newBalance,
        paymentDate: payment?.date,
        modeOfPayment: payment?.mode,
      };

      setPaymentData((prevData) => [...prevData, updatedPayment]);

      // Send notifications
      if (newBalance === 0) {
        sendTextMessage(
          houseToUpdate.tenant.phone_number,
          "Your rent has been cleared. Thank you!"
        );
        sendEmailReceipt(houseToUpdate.tenant.email, updatedPayment);
      } else {
        sendTextMessage(
          houseToUpdate.tenant.phone_number,
          `Your rent balance is KES ${newBalance}. Please clear it soon.`
        );
        sendEmailReceipt(houseToUpdate.tenant.email, updatedPayment);
      }
    }
  };

  // Generate PDF report
  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableData = paymentData.map((payment) => [
      payment.houseNumber,
      payment.tenantName || "Vacant",
      payment.tenantContact || "Vacant",
      payment.payableRent,
      payment.rentPaid,
      payment.balance,
      payment.paymentDate,
      payment.modeOfPayment,
      payment.balance === 0 ? "✅" : "❌",
    ]);

    doc.autoTable({
      head: [
        [
          "House Number",
          "Tenant Name",
          "Tenant Contact",
          "Payable Rent",
          "Rent Paid",
          "Balance",
          "Payment Date",
          "Mode of Payment",
          "Cleared?",
        ],
      ],
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
      <S.Header>Monthly Rent Payment</S.Header>
      <PropertyPage
        houses={houses}
        loading={loading}
        error={error}
        paymentData={paymentData}
        downloadPDF={downloadPDF}
      />
    </S.PropertyPageContainer>
  );
};

export default PropertyContainer;
