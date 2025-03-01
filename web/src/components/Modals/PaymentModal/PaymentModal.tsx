import React, { useState } from "react";
import * as P from "./styles";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPayment: (paybillNumber: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onAddPayment,
}) => {
  const [localPaybill, setLocalPaybill] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleAddPayment = () => {
    if (localPaybill && termsAgreed) {
      onAddPayment(localPaybill);
      // Reset local states after adding payment details
      setLocalPaybill("");
      setTermsAgreed(false);
    }
  };

  if (!isOpen) return null;

  return (
    <P.ModalOverlay>
      <P.ModalContent>
        <P.ModalHeader>MPESA Payment Details</P.ModalHeader>
        <P.Instructions>
          <p>
            <strong>Payment Instructions:</strong>
          </p>
          <p>
            Tenants will use the paybill number below when paying rent. They
            will enter this as the Business Number and their specific house
            number as the Account Number.
          </p>
          <p>
            For example, if your property’s paybill is <strong>12345</strong>{" "}
            and a tenant wishes to pay for house <strong>A101</strong>, the
            tenant will select MPESA Paybill with:
          </p>
          <p>
            <strong>Business Number:</strong> 12345
            <br />
            <strong>Account Number:</strong> A101
          </p>
        </P.Instructions>
        <P.FormGroup>
          <label htmlFor="localPaybill">Paybill Number</label>
          <input
            type="text"
            id="localPaybill"
            value={localPaybill}
            onChange={(e) => setLocalPaybill(e.target.value)}
            required
          />
        </P.FormGroup>
        <P.FormGroup>
          <label htmlFor="terms" className="terms-label">
            I agree that the payment details provided will be used for tracking
            and reporting purposes in accordance with our terms and conditions.
            <input
              type="checkbox"
              id="terms"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              required
            />
          </label>
        </P.FormGroup>
        <P.ButtonContainer>
          <P.CancelButton type="button" onClick={onClose}>
            Cancel
          </P.CancelButton>
          <P.SubmitButton
            type="button"
            onClick={handleAddPayment}
            disabled={!termsAgreed}
          >
            Add Payment
          </P.SubmitButton>
        </P.ButtonContainer>
      </P.ModalContent>
    </P.ModalOverlay>
  );
};

export default PaymentModal;
