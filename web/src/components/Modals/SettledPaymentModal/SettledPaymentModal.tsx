// File: /web/src/components/Modals/SettlePaymentModal/SettlePaymentModal.tsx
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/utils";
import { IPayment } from "../../../redux/slices/paymentSlice";
import * as S from "./styles";

interface SettlePaymentModalProps {
  paymentId: number;
  onClose: () => void;
  onSettled: (paymentId: number) => void;
}

const SettlePaymentModal: React.FC<SettlePaymentModalProps> = ({
  paymentId,
  onClose,
  onSettled,
}) => {
  const allPayments = useAppSelector((state) => state.payments.data);
  const [paymentData, setPaymentData] = useState<IPayment | null>(null);

  useEffect(() => {
    // find the payment in the store
    const found = allPayments.find((p) => p.id === paymentId);
    if (found) {
      setPaymentData(found);
    }
    // If not found in store, optionally fetch from server (getPaymentById)...
  }, [allPayments, paymentId]);

  const handleMarkAsSettled = () => {
    if (!paymentData) return;
    onSettled(paymentData.id);
  };

  if (!paymentData) return null;

  return (
    <S.Overlay>
      <S.Modal>
        <S.ModalTitle>Settle Payment #{paymentData.id}</S.ModalTitle>
        <S.ModalBody>
          <p>House: {paymentData.house_number}</p>
          <p>Amount: KES {paymentData.transaction_amount}</p>
          <p>Transaction ID: {paymentData.transaction_id}</p>
          <p>Status: {paymentData.settled ? "Settled" : "Unsettled"}</p>
        </S.ModalBody>
        <S.ModalFooter>
          {!paymentData.settled && (
            <S.PrimaryButton onClick={handleMarkAsSettled}>
              Mark as Settled
            </S.PrimaryButton>
          )}
          <S.SecondaryButton onClick={onClose}>Cancel</S.SecondaryButton>
        </S.ModalFooter>
      </S.Modal>
    </S.Overlay>
  );
};

export default SettlePaymentModal;
