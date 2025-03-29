import React, { useEffect, useState } from "react";
import Notification from "../components/Notification/Notification";
import SettlePaymentModal from "../components/Modals/SettledPaymentModal/SettledPaymentModal";
import { usePayments } from "../redux/hooks/usePayment";
import { useProperties } from "../redux/hooks/useProperties";

const NotificationContainer: React.FC = () => {
  const {
    data: allPayments,
    getPaymentsByProperties,
    updatePaymentInfo,
  } = usePayments();

  const { getAllProperties, data: propertiesData } = useProperties();

  const [showSettleModal, setShowSettleModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    null
  );

  useEffect(() => {
    getAllProperties();
  }, []);

  useEffect(() => {
    if (propertiesData && propertiesData.length > 0) {
      const propertyIds = propertiesData
        .map((property) => property.id)
        .filter((id): id is number => id !== undefined)
        .map((id) => (id + 1000).toString());

      getPaymentsByProperties({
        propertyIds: propertyIds,
        settled: false,
      });
    }
  }, [propertiesData]);

  // When user clicks "View" in Notification
  const handleViewUnsettledPayment = (paymentId: number) => {
    setSelectedPaymentId(paymentId);
    setShowSettleModal(true);
  };

  // After user settles the payment in the modal
  const handlePaymentSettled = (
    paymentId: number,
    updates: { house_number: string; bill_ref_number: string }
  ) => {
    updatePaymentInfo(paymentId, { settled: true, ...updates });
    setShowSettleModal(false);
  };

  return (
    <>
      <Notification
        notifications={allPayments.map((pay) => ({
          id: pay.id,
          title: `Unsettled Payment #${pay.id}`,
          senderContacts: pay.msisdn,
          type: "unsettledPayment",
          content: `House: ${pay.house_number} | Amount: ${pay.transaction_amount}`,
          paymentId: pay.id,
        }))}
        onViewUnsettledPayment={handleViewUnsettledPayment}
      />

      {showSettleModal && selectedPaymentId && (
        <SettlePaymentModal
          paymentId={selectedPaymentId}
          onClose={() => setShowSettleModal(false)}
          onSettled={handlePaymentSettled}
        />
      )}
    </>
  );
};

export default NotificationContainer;
