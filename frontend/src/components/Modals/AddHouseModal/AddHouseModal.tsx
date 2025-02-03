import React, { useState } from "react";
import { useHouses } from "../../../redux/hooks/useHouses";
import * as S from "./styles";

interface AddHouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number;
}

const AddHouseModal: React.FC<AddHouseModalProps> = ({
  isOpen,
  onClose,
  propertyId,
}) => {
  const [houseNumber, setHouseNumber] = useState("");
  const [payableRent, setPayableRent] = useState<number | undefined>();
  const { addHouseToProperty } = useHouses();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addHouseToProperty(propertyId, {
      house_number: houseNumber,
      payable_rent: payableRent || 0,
      tenant: null,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>Add New House</S.ModalHeader>
        <form onSubmit={handleSubmit}>
          <S.FormGroup>
            <label>House Number</label>
            <S.InputField
              type="text"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              required
            />
          </S.FormGroup>
          <S.FormGroup>
            <label>Monthly Rent</label>
            <S.InputField
              type="number"
              value={payableRent || ""}
              onChange={(e) => setPayableRent(Number(e.target.value))}
              required
              placeholder="KSH"
            />
          </S.FormGroup>
          <S.ButtonContainer>
            <S.CancelButton type="button" onClick={onClose}>
              Cancel
            </S.CancelButton>
            <S.SubmitButton type="submit">Add House</S.SubmitButton>
          </S.ButtonContainer>
        </form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default AddHouseModal;
