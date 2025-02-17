import React, { useState, useEffect } from "react";
import { IHouse } from "../../../redux/slices/houseSlice";
import { useHouses } from "../../../redux/hooks/useHouses";
import * as S from "./styles";
import { IoClose } from "react-icons/io5";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { ModalOverlay } from "../../../styles/foundation";

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

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

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

  if (!isOpen) return null;

  return (
    <>
      <ModalOverlay>
        <S.ModalContent>
          <S.CloseButton onClick={onClose}>
            <IoClose size={20} color="red" />
          </S.CloseButton>
          <S.ModalHeader>
            {isVariantEditHouse ? "Update or Delete House" : "Add New House"}
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
              {isVariantEditHouse && (
                <S.DeleteButton
                  type="button"
                  onClick={() => {
                    setShowConfirmationModal(true);
                  }}
                >
                  Delete
                </S.DeleteButton>
              )}
              <S.SubmitButton type="submit">
                {isVariantEditHouse ? "Save Changes" : "Add House"}
              </S.SubmitButton>
            </S.ButtonContainer>
          </form>
        </S.ModalContent>
      </ModalOverlay>
      {showConfirmationModal && (
        <ConfirmationModal
          message={`Deleting house ${
            house?.house_number || "this house"
          } will also delete all of its related tenants data. Are you sure you want to proceed?`}
          onConfirm={() => {
            if (house && propertyId) {
              deleteHouseFromProperty(house.id, propertyId);
              setShowConfirmationModal(false);
              onClose();
            }
          }}
          onCancel={() => {
            setShowConfirmationModal(false);
          }}
        />
      )}
    </>
  );
};

export default HouseModal;
