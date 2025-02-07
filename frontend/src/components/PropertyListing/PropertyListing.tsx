import React, { useState } from "react";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import * as S from "./styles";
import { IProperty } from "../../redux/slices/propertiesSlice";
import ConfirmationModal from "../Modals/ConfirmationModal/ConfirmationModal";

interface PropertyListingProps {
  propertiesData: IProperty[];
  onEditProperty: (updatedProperty: IProperty) => void;
  onDeleteProperty: (id: number) => void;
}

const PropertyListing: React.FC<PropertyListingProps> = ({
  propertiesData,
  onEditProperty,
  onDeleteProperty,
}) => {
  const [editingPropertyId, setEditingPropertyId] = useState<number | null>(
    null
  );
  const [propertyName, setPropertyName] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);

  const startEditingProperty = (property: IProperty) => {
    setEditingPropertyId(property.id!);
    setPropertyName(property.name);
  };

  const cancelEditingProperty = () => {
    setEditingPropertyId(null);
    setPropertyName("");
  };

  const saveEditingProperty = (property: IProperty) => {
    if (propertyName && propertyName !== property.name) {
      onEditProperty({ ...property, name: propertyName });
    }
    setEditingPropertyId(null);
    setPropertyName("");
  };

  const confirmDeletion = (id: number) => {
    setPropertyToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (propertyToDelete !== null) {
      onDeleteProperty(propertyToDelete);
      setPropertyToDelete(null);
    }
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setPropertyToDelete(null);
    setShowModal(false);
  };

  return (
    <S.PropertyListingContainer>
      <S.ListingHeader>
        <h2>Managed Properties</h2>
      </S.ListingHeader>
      <S.PropertiesList>
        {propertiesData.map((property) => (
          <S.PropertyItem key={property.id}>
            <S.PropertyInfo>
              {editingPropertyId === property.id ? (
                <S.InputGroup>
                  <S.InputField
                    type="text"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                  />
                  <S.IconButton onClick={() => saveEditingProperty(property)}>
                    <FiCheck />
                  </S.IconButton>
                  <S.IconButton onClick={cancelEditingProperty}>
                    <FiX />
                  </S.IconButton>
                </S.InputGroup>
              ) : (
                <>
                  <S.PropertyName>{property.name}</S.PropertyName>
                  <S.PropertyUnits>
                    {property.houses?.length || 0} Units
                  </S.PropertyUnits>
                </>
              )}
            </S.PropertyInfo>
            <S.PropertyActions>
              {editingPropertyId !== property.id && (
                <>
                  <S.EditButton onClick={() => startEditingProperty(property)}>
                    <FiEdit />
                  </S.EditButton>
                  <S.DeleteButton onClick={() => confirmDeletion(property.id!)}>
                    <FiTrash2 />
                  </S.DeleteButton>
                </>
              )}
            </S.PropertyActions>
          </S.PropertyItem>
        ))}
      </S.PropertiesList>
      {showModal && (
        <ConfirmationModal
          message="Deleting this property will also delete all of its related data. Are you sure you want to proceed?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </S.PropertyListingContainer>
  );
};

export default PropertyListing;
