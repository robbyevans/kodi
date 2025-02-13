import React, { useState, useEffect } from "react";
import { IHouse } from "../../../redux/slices/houseSlice";
import { useHouses } from "../../../redux/hooks/useHouses";
import * as S from "./styles";

interface EditHouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  house: IHouse;
  propertyId: number;
}

const EditHouseModal: React.FC<EditHouseModalProps> = ({
  isOpen,
  onClose,
  house,
  propertyId,
}) => {
  // Initialize local state from the current house details
  const [houseNumber, setHouseNumber] = useState(house.house_number);
  const [payableRent, setPayableRent] = useState<number | null>(
    house.payable_rent ?? null
  );
  const [payableDeposit, setPayableDeposit] = useState<number | null>(
    house.payable_deposit ?? null
  );

  // When the passed house changes, update local state accordingly
  useEffect(() => {
    setHouseNumber(house.house_number);
    setPayableRent(house.payable_rent ?? null);
    setPayableDeposit(house.payable_deposit ?? null);
  }, [house]);

  // From the useHouses hook, we extract our edit and delete functions
  const { editHouseInProperty, deleteHouseFromProperty } = useHouses();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedHouse: IHouse = {
      ...house,
      house_number: houseNumber,
      payable_rent: payableRent,
      payable_deposit: payableDeposit,
      property_id: propertyId, // Force property_id to use the prop value
    };

    // Dispatch the edit action
    await editHouseInProperty(updatedHouse);
    onClose();
  };

  const handleDelete = async () => {
    // Confirm deletion with the user
    if (window.confirm("Are you sure you want to delete this house?")) {
      await deleteHouseFromProperty(house.id, propertyId);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>Edit House</S.ModalHeader>
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
            <label>House Deposit</label>
            <S.InputField
              type="number"
              value={payableDeposit !== null ? payableDeposit : ""}
              onChange={(e) =>
                setPayableDeposit(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              placeholder="KSH"
            />
          </S.FormGroup>
          <S.FormGroup>
            <label>Monthly Rent</label>
            <S.InputField
              type="number"
              value={payableRent !== null ? payableRent : ""}
              onChange={(e) =>
                setPayableRent(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              placeholder="KSH"
            />
          </S.FormGroup>
          <S.ButtonContainer>
            <S.CancelButton type="button" onClick={onClose}>
              Cancel
            </S.CancelButton>
            <S.DeleteButton type="button" onClick={handleDelete}>
              Delete
            </S.DeleteButton>
            <S.SubmitButton type="submit">Save Changes</S.SubmitButton>
          </S.ButtonContainer>
        </form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default EditHouseModal;
