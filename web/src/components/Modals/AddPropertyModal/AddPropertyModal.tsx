import React, { useState } from "react";
import { useProperties } from "../../../redux/hooks/useProperties";
import { useAdmins } from "../../../redux/hooks/useAdmin";
import * as S from "./styles";
import PaymentModal from "../PaymentModal/PaymentModal";
import { ModalOverlay } from "../../../styles/foundation";
import mpesaLogo from "../../../assets/mpesa-logo.png";
import kcbLogo from "../../../assets/kcb-logo.png";
import equityLogo from "../../../assets/equity-logo.png";
import { LuInfo } from "react-icons/lu";

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
  const [numberOfUnits, setNumberOfUnits] = useState<number>(0);

  // Payment details state (unchanged)
  const [showPaymentSelection, setShowPaymentSelection] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paybillNumber, setPaybillNumber] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const { handleAddProperty } = useProperties();
  const { user } = useAdmins();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPropertyImage(file);
    }
  };

  const handleTogglePaymentSelection = () => {
    setShowPaymentSelection(!showPaymentSelection);
  };

  const handleAddPayment = (number: string) => {
    setPaybillNumber(number);
    setTermsAgreed(true);
    setShowPaymentModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const paymentData =
        termsAgreed && paybillNumber
          ? { mpesa_paybill_number: paybillNumber }
          : {};

      const newProperty = {
        admin_id: user.admin_id!,
        name: propertyName,
        location: location || undefined,
        address: address || undefined,
        property_image: propertyImage || undefined,
        number_of_units: numberOfUnits > 0 ? numberOfUnits : undefined,
        ...paymentData,
      };

      await handleAddProperty(newProperty);
      // Reset fields after submission
      setPropertyName("");
      setLocation("");
      setAddress("");
      setPropertyImage(null);
      setSelectedPaymentMethod("");
      setPaybillNumber("");
      setTermsAgreed(false);
      setShowPaymentSelection(false);
      setNumberOfUnits(0);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>Add New Property</S.ModalHeader>
        <S.ModalBody>
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
            <S.FormGroup>
              <label htmlFor="numberOfUnits">
                Number of Houses in this property (max 100) (optional)
              </label>
              <S.InfoPoint>
                <LuInfo style={{ marginRight: "8px" }} />
                This will prefill your property with default houses but you will
                be able to add, remove or edit these houses later in the
                property page.
              </S.InfoPoint>
              <input
                type="number"
                id="numberOfUnits"
                min="0"
                max="100"
                value={numberOfUnits}
                onChange={(e) =>
                  setNumberOfUnits(Math.min(100, parseInt(e.target.value) || 0))
                }
              />
            </S.FormGroup>

            {/* Payment Details Section */}
            <S.FormGroup>
              <button type="button" onClick={handleTogglePaymentSelection}>
                {showPaymentSelection
                  ? "Hide Payment Options"
                  : "Add Payment Details"}
              </button>
            </S.FormGroup>
            {showPaymentSelection && (
              <S.PaymentSection>
                <S.FormGroup>
                  <label>Select Payment Option</label>
                  <S.PaymentOption>
                    <S.PaymentLogo src={mpesaLogo} alt="Mpesa Logo" />
                    <label>
                      <input
                        type="radio"
                        name="paymentOption"
                        value="mpesa"
                        onChange={() => setSelectedPaymentMethod("mpesa")}
                      />
                      <S.paymentText>MPESA</S.paymentText>
                    </label>
                  </S.PaymentOption>
                  <S.PaymentOption>
                    <S.PaymentLogo src={kcbLogo} alt="KCB Logo" />
                    <label>
                      <input
                        type="radio"
                        name="paymentOption"
                        value="kcb"
                        disabled
                      />
                      <S.paymentText>KCB (Disabled)</S.paymentText>
                    </label>
                  </S.PaymentOption>
                  <S.PaymentOption>
                    <S.PaymentLogo src={equityLogo} alt="Equity Bank Logo" />
                    <label>
                      <input
                        type="radio"
                        name="paymentOption"
                        value="equity"
                        disabled
                      />
                      <S.paymentText>Equity Bank (Disabled)</S.paymentText>
                    </label>
                  </S.PaymentOption>
                </S.FormGroup>
                {selectedPaymentMethod === "mpesa" && (
                  <S.FormGroup>
                    <button
                      type="button"
                      onClick={() => setShowPaymentModal(true)}
                    >
                      Proceed with MPESA Payment
                    </button>
                  </S.FormGroup>
                )}
              </S.PaymentSection>
            )}
          </form>
        </S.ModalBody>
        <S.ButtonContainer>
          <S.CancelButton type="button" onClick={onClose}>
            Cancel
          </S.CancelButton>
          <S.SubmitButton type="submit" onClick={handleSubmit}>
            Add Property
          </S.SubmitButton>
        </S.ButtonContainer>
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onAddPayment={handleAddPayment}
        />
      </S.ModalContent>
    </ModalOverlay>
  );
};

export default AddPropertyModal;
