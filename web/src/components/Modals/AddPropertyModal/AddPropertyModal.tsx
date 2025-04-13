import React, { useState, useRef, useEffect } from "react";
import { useProperties } from "../../../redux/hooks/useProperties";
import { useAdmins } from "../../../redux/hooks/useAdmin";
import * as S from "./styles";
import { LuInfo } from "react-icons/lu";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

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
  const [numberOfUnits, setNumberOfUnits] = useState<string>("");

  const { handleAddProperty } = useProperties();
  const { user } = useAdmins();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPropertyImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const newProperty = {
        admin_id: user.admin_id!,
        name: propertyName,
        location: location || undefined,
        address: address || undefined,
        property_image: propertyImage || undefined,
        number_of_units: Number(numberOfUnits)<=100? Number(numberOfUnits) : 0,
      };

      await handleAddProperty(newProperty);
      // Reset fields after submission
      setPropertyName("");
      setLocation("");
      setAddress("");
      setPropertyImage(null);
      setNumberOfUnits("");
      onClose();
    }
  };

  const modalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTo({
        top: modalBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>Add New Property</S.ModalHeader>
        <S.ModalBody ref={modalBodyRef}>
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
                Number of Houses in this property (optional)
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
                placeholder="number of houses in this property"
                value={numberOfUnits}
                onChange={(e) => setNumberOfUnits(e.target.value)}
              />
            </S.FormGroup>
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
      </S.ModalContent>
    </ModalOverlay>
  );
};

export default AddPropertyModal;
