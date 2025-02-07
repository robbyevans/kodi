import React, { useState } from "react";
import { useProperties } from "../../../redux/hooks/useProperties";
import { useAdmins } from "../../../redux/hooks/useAdmin";
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
  const [propertyImage, setPropertyImage] = useState<File | null>(null);
  const { handleAddProperty } = useProperties();
  const { user } = useAdmins();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      // Build an object of type IProperty.
      // Note: If no image is selected, property_image is undefined.
      const newProperty = {
        admin_id: user.admin_id!,
        name: propertyName,
        property_image: propertyImage || undefined,
      };
      await handleAddProperty(newProperty);
      onClose();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPropertyImage(file);
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
          <S.FormGroup>
            <label htmlFor="propertyImage">Property Image (optional)</label>
            <input
              type="file"
              id="propertyImage"
              accept="image/*"
              onChange={handleImageUpload}
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
