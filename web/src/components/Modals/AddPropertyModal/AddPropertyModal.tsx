// File: /web/src/components/Modals/AddPropertyModal/AddPropertyModal.tsx
import React, { useState } from "react";
import { useProperties } from "../../../redux/hooks/useProperties";
import { useAdmins } from "../../../redux/hooks/useAdmin";
import * as S from "./styles";
import { ModalOverlay } from "../../../styles/foundation";

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [propertyName, setPropertyName] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [propertyImage, setPropertyImage] = useState<File | null>(null);

  // Payment details state
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paybillNumber, setPaybillNumber] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);

  const { handleAddProperty } = useProperties();
  const { user } = useAdmins();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      // Only include payment details if the user agreed
      const paymentData =
        termsAgreed && paybillNumber
          ? { mpesa_paybill_number: paybillNumber }
          : {};

      const newProperty = {
        admin_id: user.admin_id!,
        name: propertyName,
        location: location || undefined,
        address: address || undefined,
        ...paymentData,
        property_image: propertyImage || undefined,
      };

      await handleAddProperty(newProperty);
      // Reset fields after submission
      setPropertyName("");
      setLocation("");
      setAddress("");
      setPropertyImage(null);
      setPaymentMethod("");
      setPaybillNumber("");
      setTermsAgreed(false);
      setShowPaymentSection(false);
      onClose();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPropertyImage(file);
    }
  };

  // Toggle payment section display
  const handleTogglePayment = () => {
    setShowPaymentSection(!showPaymentSection);
  };

  // When the user agrees to terms, collapse the payment section automatically.
  const handleAgreeTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAgreed(e.target.checked);
    if (e.target.checked) {
      // Optionally collapse the section once agreed
      setShowPaymentSection(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>Add New Property</S.ModalHeader>
        <form onSubmit={handleSubmit}>
          <S.FormGroup>
            <label htmlFor="propertyName">Property Name</label>
            <input
              type="text"
              id="propertyName"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              required
            />
          </S.FormGroup>
          <S.FormGroup>
            <label htmlFor="location">Location (optional)</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </S.FormGroup>
          <S.FormGroup>
            <label htmlFor="address">Address (optional)</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </S.FormGroup>
          <S.FormGroup>
            <label htmlFor="propertyImage">Property Image (optional)</label>
            <input
              type="file"
              id="propertyImage"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </S.FormGroup>

          {/* Payment Details Section */}
          <S.FormGroup>
            <button type="button" onClick={handleTogglePayment}>
              {showPaymentSection
                ? "Hide Payment Details"
                : "Add Payment Details"}
            </button>
          </S.FormGroup>
          {showPaymentSection && (
            <S.PaymentSection>
              <S.FormGroup>
                <label htmlFor="paymentMethod">Select Payment Option</label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="">--Select Payment Option--</option>
                  <option value="mpesa">MPESA</option>
                  <option value="kcb">KCB</option>
                  <option value="equity">Equity Bank</option>
                </select>
              </S.FormGroup>
              {/* Only show paybill field if a payment option is selected */}
              {paymentMethod && (
                <>
                  <S.FormGroup>
                    <label htmlFor="paybillNumber">Paybill Number</label>
                    <input
                      type="text"
                      id="paybillNumber"
                      value={paybillNumber}
                      onChange={(e) => setPaybillNumber(e.target.value)}
                      required
                    />
                  </S.FormGroup>
                  <S.FormGroup>
                    <label htmlFor="terms">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={termsAgreed}
                        onChange={handleAgreeTerms}
                        required
                      />
                      I agree that the payment information provided will be used
                      by Kodi to track and monitor all payment data made to this
                      paybill account for analytics purposes only.
                    </label>
                  </S.FormGroup>
                </>
              )}
            </S.PaymentSection>
          )}

          <S.ButtonContainer>
            <S.CancelButton type="button" onClick={onClose}>
              Cancel
            </S.CancelButton>
            <S.SubmitButton type="submit">Add Property</S.SubmitButton>
          </S.ButtonContainer>
        </form>
      </S.ModalContent>
    </ModalOverlay>
  );
};

export default AddPropertyModal;
