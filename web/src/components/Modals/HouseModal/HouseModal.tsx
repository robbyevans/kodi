import React, { useState, useEffect } from "react";
import { IHouse } from "../../../redux/slices/houseSlice";
import { useHouses } from "../../../redux/hooks/useHouses";
import * as S from "./styles";

interface HouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number;
  /** Set to true to use the edit variant */
  isVariantEditHouse?: boolean;
  /** Required in edit mode */
  house?: IHouse;
}

const HouseModal: React.FC<HouseModalProps> = ({
  isOpen,
  onClose,
  propertyId,
  isVariantEditHouse = false,
  house,
}) => {
  const { addHouseToProperty, editHouseInProperty, deleteHouseFromProperty } =
    useHouses();

  // Initialize local state – if in edit mode, pre-populate with the house details
  const [houseNumber, setHouseNumber] = useState<string>(
    isVariantEditHouse && house ? house.house_number : ""
  );
  const [payableRent, setPayableRent] = useState<number | null>(
    isVariantEditHouse && house ? house.payable_rent ?? null : null
  );
  const [payableDeposit, setPayableDeposit] = useState<number | null>(
    isVariantEditHouse && house ? house.payable_deposit ?? null : null
  );

  // Update form fields when the passed house changes (in edit mode)
  useEffect(() => {
    if (isVariantEditHouse && house) {
      setHouseNumber(house.house_number);
      setPayableRent(house.payable_rent ?? null);
      setPayableDeposit(house.payable_deposit ?? null);
    }
  }, [house, isVariantEditHouse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isVariantEditHouse && house) {
      // Edit mode: dispatch the update action
      const updatedHouse: IHouse = {
        ...house,
        house_number: houseNumber,
        payable_rent: payableRent,
        payable_deposit: payableDeposit,
        property_id: propertyId,
      };
      await editHouseInProperty(updatedHouse);
    } else {
      // Add mode: dispatch the add action
      await addHouseToProperty(propertyId, {
        house_number: houseNumber,
        payable_rent: payableRent,
        payable_deposit: payableDeposit,
        tenant: null,
      });
    }
    onClose();
  };

  const handleDelete = async () => {
    if (
      house &&
      window.confirm("Are you sure you want to delete this house?")
    ) {
      await deleteHouseFromProperty(house.id, propertyId);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          {isVariantEditHouse ? "Edit House" : "Add New House"}
        </S.ModalHeader>
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
            {isVariantEditHouse && (
              <S.DeleteButton type="button" onClick={handleDelete}>
                Delete
              </S.DeleteButton>
            )}
            <S.SubmitButton type="submit">
              {isVariantEditHouse ? "Save Changes" : "Add House"}
            </S.SubmitButton>
          </S.ButtonContainer>
        </form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default HouseModal;
