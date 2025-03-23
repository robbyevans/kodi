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
  const [selectedHouse, setSelectedHouse] = useState<string>("");
  const [billRefNumber, setBillRefNumber] = useState<string>("");

  useEffect(() => {
    // Find the payment in the store
    const found = allPayments.find((p) => p.id === paymentId);
    if (found) {
      setPaymentData(found);
      setSelectedHouse(found.house_number);
      setBillRefNumber(found.bill_ref_number);
      // Compute correct property id: paymentData.property_id minus 1000
      const numericPropertyId = parseInt(found.property_id) - 1000;
      getHousesByProperty(numericPropertyId);
    }
  }, [allPayments, paymentId]);

  // When the dropdown selection changes, update both the selected house and the bill ref number.
  const handleHouseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHouse = e.target.value;
    setSelectedHouse(newHouse);
    // Update bill_ref_number: use the part before '#' and replace what comes after with newHouse
    const parts = billRefNumber.split("#");
    const prefix = parts[0];
    const newBillRef = `${prefix}#${newHouse}`;
    setBillRefNumber(newBillRef);
  };

  const handleMarkAsSettled = () => {
    if (!paymentData) return;
    onSettled(paymentData.id, {
      house_number: selectedHouse,
      bill_ref_number: billRefNumber,
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
            <label htmlFor="houseSelect">House Number: </label>
            <select
              id="houseSelect"
              // placeHolder={paymentData.house_number}
              value={selectedHouse}
              onChange={handleHouseChange}
            >
              <option value="" disabled>
                Select house number
              </option>
              {houses.map((house) => (
                <option key={house.house_number} value={house.house_number}>
                  {house.house_number}
                </option>
              ))}
            </select>
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
