import React, { useState } from "react";
import { useProperties } from "../../../redux/hooks/useProperties";
import { useAdmins } from "../../../redux/hooks/useAdmin"; // Import useAdmins to get the current admin
import * as S from "./styles";

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [propertyName, setPropertyName] = useState("");
  const { addProperty } = useProperties();
  const { currentAdmin } = useAdmins();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAdmin) {
      await addProperty({
        name: propertyName,
        houses: [],
        admin_id: currentAdmin.admin_id,
      });
      onClose();
    } else {
      alert("You must be logged in as an admin to add a property.");
    }
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
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
          <S.ButtonContainer>
            <S.CancelButton type="button" onClick={onClose}>
              Cancel
            </S.CancelButton>
            <S.SubmitButton type="submit">Add Property</S.SubmitButton>
          </S.ButtonContainer>
        </form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default AddPropertyModal;
