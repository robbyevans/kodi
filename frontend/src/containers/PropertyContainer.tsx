import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { useProperties } from "../redux/hooks/useProperties";
import { useHouses } from "../redux/hooks/useHouses";

import * as S from "../components/PropertyPage/styles";
import PropertyPage from "../components/PropertyPage/PropertyPage";

const PropertyContainer = () => {
  const { getPropertyById } = useProperties();
  const { houses, getHousesByProperty, loading, error } = useHouses();
  // const { payments, loading, error } = usePayment();
  const [paymentData] = useState<any[]>([]);
  const { propertyId } = useParams<{ propertyId: string }>();

  // Fetch property and houses on this property on component mount
  useEffect(() => {
    if (propertyId) {
      getPropertyById(Number(propertyId));
      getHousesByProperty(Number(propertyId));
    }
  }, [propertyId]);

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

//in my kodi application, every month , the propertyPage table will receive new tenant information (rent payed) from the mpesa daraja c2b api. a tenant will pay rent via the mpesa baybill number and will indicate the account number as their house number. This way the b2c daraja api will send a post request to our url and we will take this information and store it to our databade. once saved, we will check if the data matches any tenant  house number and then update the tenant rent payed information and also update on the date payed .

//set up this mpesa c2b controller
