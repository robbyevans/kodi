import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/utils";
import { useHouses } from "../../../redux/hooks/useHouses";
import { IPayment } from "../../../redux/slices/paymentSlice";
import * as S from "./styles";

interface SettlePaymentModalProps {
  paymentId: number;
  onClose: () => void;
  onSettled: (
    paymentId: number,
    updates: { house_number: string; bill_ref_number: string }
  ) => void;
}

const SettlePaymentModal: React.FC<SettlePaymentModalProps> = ({
  paymentId,
  onClose,
  onSettled,
}) => {
  const allPayments = useAppSelector((state) => state.payments.data);
  const { houses, getHousesByProperty } = useHouses();

  const [paymentData, setPaymentData] = useState<IPayment | null>(null);
  // Initially keep selectedHouse empty so the placeholder is visible.
  const [selectedHouse, setSelectedHouse] = useState<string>("");
  const [billRefNumber, setBillRefNumber] = useState<string>("");
  // Store the bill reference prefix (the part before "#")
  const [billRefPrefix, setBillRefPrefix] = useState<string>("");

  useEffect(() => {
    // Find the payment in the store.
    const found = allPayments.find((p) => p.id === paymentId);
    if (found) {
      setPaymentData(found);
      // Do not set selectedHouse here so that the placeholder remains visible.
      setBillRefNumber(found.bill_ref_number);
      const parts = found.bill_ref_number.split("#");
      setBillRefPrefix(parts[0]);
      // Compute correct property id: paymentData.property_id minus 1000.
      const numericPropertyId = parseInt(found.property_id) - 1000;
      getHousesByProperty(numericPropertyId);
    }
  }, [allPayments, paymentId]);

  // When the input changes, update the selected house and update the bill reference number.
  const handleHouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHouse = e.target.value;
    setSelectedHouse(newHouse);
    const newBillRef = `${billRefPrefix}#${newHouse}`;
    setBillRefNumber(newBillRef);
  };

  const handleMarkAsSettled = () => {
    if (!paymentData) return;
    // If no new house was entered, fall back to the original house number.
    const houseToUse = selectedHouse || paymentData.house_number;
    const finalBillRef = selectedHouse
      ? billRefNumber
      : paymentData.bill_ref_number;
    onSettled(paymentData.id, {
      house_number: houseToUse,
      bill_ref_number: finalBillRef,
    });
  };

  if (!paymentData) return null;

  return (
    <S.Overlay>
      <S.Modal>
        <S.ModalTitle>Settle Payment #{paymentData.id}</S.ModalTitle>
        <S.ModalBody>
          <p>Transaction ID: {paymentData.transaction_id}</p>
          <p>Sender Phone number: {paymentData.msisdn}</p>
          <p>Amount: KES {paymentData.transaction_amount}</p>
          <p>Status: {paymentData.settled ? "Settled" : "Unsettled"}</p>
          <div>
            <label htmlFor="houseInput">House Number: </label>
            <input
              id="houseInput"
              list="houseNumbers"
              placeholder={paymentData.house_number}
              value={selectedHouse}
              onChange={handleHouseChange}
            />
            <datalist id="houseNumbers">
              {houses.map((house) => (
                <option key={house.house_number} value={house.house_number} />
              ))}
            </datalist>
          </div>
          <div>
            <p>
              Bill Reference Number: <strong>{billRefNumber}</strong>
            </p>
          </div>
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
