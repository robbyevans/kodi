import React, { useState, useEffect } from "react";
import { IHouse } from "../../../redux/slices/houseSlice";
import { useHouses } from "../../../redux/hooks/useHouses";
import * as S from "./styles";
import { IoClose } from "react-icons/io5";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

interface HouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number;
  isVariantEditHouse?: boolean;
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

  const [houseNumber, setHouseNumber] = useState<string>("");
  const [payableRent, setPayableRent] = useState<number | null>(null);
  const [payableDeposit, setPayableDeposit] = useState<number | null>(null);
  const [noDeposit, setNoDeposit] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (isVariantEditHouse && house) {
      setHouseNumber(house.house_number);
      setPayableRent(house.payable_rent ?? null);
      setPayableDeposit(house.payable_deposit ?? null);
      setNoDeposit(
        house.payable_deposit === null || house.payable_deposit === 0
      );
    } else {
      setHouseNumber("");
      setPayableRent(null);
      setPayableDeposit(null);
      setNoDeposit(false);
    }
  }, [house, isVariantEditHouse, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!houseNumber.trim()) {
      alert("House number is required.");
      return;
    }

    if (!payableRent || payableRent <= 0) {
      alert("Payable rent is required and must be greater than 0.");
      return;
    }

    if (!noDeposit && (payableDeposit === null || payableDeposit < 0)) {
      alert("Please provide a valid deposit amount or check 'No deposit'.");
      return;
    }

    const depositValue = noDeposit ? null : payableDeposit;

    if (isVariantEditHouse && house) {
      const updatedHouse: IHouse = {
        ...house,
        house_number: houseNumber,
        payable_rent: payableRent,
        payable_deposit: depositValue,
        property_id: propertyId,
      };
      await editHouseInProperty(updatedHouse);
    } else {
      await addHouseToProperty(propertyId, {
        house_number: houseNumber,
        payable_rent: payableRent,
        payable_deposit: depositValue,
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
            {isVariantEditHouse ? "Update House Details" : "Add New House"}
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
              <label>Monthly Rent (required)</label>
              <S.InputField
                type="number"
                value={payableRent !== null ? payableRent : ""}
                onChange={(e) =>
                  setPayableRent(
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
                placeholder="KSH"
                required
              />
            </S.FormGroup>

            <S.FormGroup>
              <label>Deposit Amount (optional)</label>
              <S.InputField
                type="number"
                value={payableDeposit !== null ? payableDeposit : ""}
                onChange={(e) =>
                  setPayableDeposit(
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
                placeholder="KSH"
                disabled={noDeposit}
              />
              <S.CheckboxContainer>
                <input
                  type="checkbox"
                  checked={noDeposit}
                  onChange={(e) => setNoDeposit(e.target.checked)}
                />
                <span>No payable deposit for this house</span>
              </S.CheckboxContainer>
            </S.FormGroup>

            <S.ButtonContainer>
              {isVariantEditHouse && (
                <S.DeleteButton
                  type="button"
                  onClick={() => setShowConfirmationModal(true)}
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
          } will also delete all its tenant data. Are you sure?`}
          onConfirm={() => {
            if (house && propertyId) {
              deleteHouseFromProperty(house.id, propertyId);
              setShowConfirmationModal(false);
              onClose();
            }
          }}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
    </>
  );
};

export default HouseModal;
