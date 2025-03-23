import React, { useEffect, useState } from "react";
import Notification from "../components/Notification/Notification";
import SettlePaymentModal from "../components/Modals/SettledPaymentModal/SettledPaymentModal";
import { usePayments } from "../redux/hooks/usePayment";

const NotificationContainer: React.FC = () => {
  const {
    data: allPayments,
    getAllPayments,
    updatePaymentInfo,
  } = usePayments();

  const [showSettleModal, setShowSettleModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    null
  );

  useEffect(() => {
    // On mount, fetch all payments for the current admin (filtering if needed)
    getAllPayments(new Date().getFullYear());
  }, []);

  // Filter out only unsettled payments
  const unsettledPayments = allPayments.filter((p) => !p.settled);

  // When user clicks "View" in Notification
  const handleViewUnsettledPayment = (paymentId: number) => {
    setSelectedPaymentId(paymentId);
    setShowSettleModal(true);
  };

  // After user settles the payment in the modal, update settled to true along with house number and bill ref number.
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
        notifications={unsettledPayments.map((pay) => ({
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
