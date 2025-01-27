import { useState, useEffect } from "react";
import { useProperties } from "../redux/hooks/useProperties";
import { useHouses } from "../redux/hooks/useHouses";
import axios from "axios";
// import { sendTextMessage, sendEmailReceipt } from "../../utils/notifications";
import * as S from "../components/PropertyPage/styles";
import PropertyPage from "../components/PropertyPage/PropertyPage";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";

const PropertyContainer = () => {
  const { houses, getPropertyHouses, loading, error } = useHouses();
  const { getPropertyById, data } = useProperties();
  const [paymentData, setPaymentData] = useState<any[]>([]);
  const { propertyId } = useParams<{ propertyId: string }>();
  useEffect(() => {
    getPropertyById(Number(propertyId));
    getPropertyHouses(Number(propertyId));
  }, []);

  useEffect(() => {
    if (houses) {
      houses.forEach((house) => {
        axios.get(`api/mpesa/${house.id}`).then((response) => {
          const payment = response.data.payment;

          updateHouseRentPayment(house.id, payment);
        });
      });
    }
  }, [houses]);

  const updateHouseRentPayment = (houseId: number, payment: any) => {
    const houseToUpdate = houses.find((house) => house.id === houseId);
    if (houseToUpdate) {
      const newBalance = houseToUpdate.payable_rent - payment.amount;
      setPaymentData((prevData) => [
        ...prevData,
        {
          ...houseToUpdate,
          rentPaid: payment.amount,
          balance: newBalance,
          modeOfPayment: payment.mode,
          paymentDate: payment.date,
        },
      ]);

      // if (newBalance === 0) {
      //   sendTextMessage(houseToUpdate.tenant.phone_number, "Rent cleared");
      //   sendEmailReceipt(houseToUpdate.tenant.email, houseToUpdate);
      // } else {
      //   sendTextMessage(
      //     houseToUpdate.tenant.phone_number,
      //     "Rent balance pending"
      //   );
      //   sendEmailReceipt(houseToUpdate.tenant.email, houseToUpdate);
      // }
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableData = paymentData.map((payment) => [
      payment.house_number,
      payment.tenant?.name || "vacant",
      payment.tenant?.phone_number || "vacant",
      payment.payable_rent,
      payment.rentPaid,
      payment.depositMonth || "0",
      payment.balance,
      payment.paymentDate,
      payment.modeOfPayment,
      payment.balance === 0 ? "✅" : "❌",
      payment.balance === 0 ? "Cleared" : "Pending",
    ]);

    doc.autoTable({
      head: [
        [
          "House Number",
          "Tenant Name",
          "Tenant Contact",
          "Payable Rent",
          "Rent Paid",
          "Rent Deposit",
          "Balance",
          "Payment Date",
          "Mode of Payment",
          "Rent Cleared",
          "Status",
        ],
      ],
      body: tableData,
    });

    const monthYear = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    doc.save(`${monthYear}-Rent-Payment.pdf`);

    axios
      .post(`/api/saveRentData`, { paymentData, monthYear })
      .then((response) => {
        console.log("Data saved to spreadsheet: ", response);
      });
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
