import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
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
  const [editingPropertyImage, setEditingPropertyImage] = useState<File | null>(
    null
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);

  const startEditingProperty = (property: IProperty) => {
    setEditingPropertyId(property.id!);
    setPropertyName(property.name);
    // Reset the image file in edit mode.
    setEditingPropertyImage(null);
  };

  const cancelEditingProperty = () => {
    setEditingPropertyId(null);
    setPropertyName("");
    setEditingPropertyImage(null);
  };

  const saveEditingProperty = (property: IProperty) => {
    const updatedProperty: IProperty = {
      ...property,
      name: propertyName,
      property_image: editingPropertyImage
        ? editingPropertyImage
        : property.property_image,
    };
    onEditProperty(updatedProperty);
    setEditingPropertyId(null);
    setPropertyName("");
    setEditingPropertyImage(null);
  };

  const confirmDeletion = (id: number, name: string) => {
    setPropertyToDelete(id);
    setPropertyName(name); // For displaying the property name in the confirmation modal.
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (propertyToDelete !== null) {
      onDeleteProperty(propertyToDelete);
      setPropertyToDelete(null);
    }
    setShowModal(false);
    setPropertyName("");
  };

  const handleCancelDelete = () => {
    setPropertyToDelete(null);
    setShowModal(false);
    setPropertyName("");
  };

  return (
    <S.PropertyListingContainer>
      <S.ListingHeader>
        <h2>Managed Properties</h2>
      </S.ListingHeader>
      <S.PropertiesList>
        {propertiesData.map((property, index) => (
          <S.PropertyItem
            key={property.id}
            onClick={() => startEditingProperty(property)}
          >
            <S.PropertyMain>
              <S.PropertyNumber>{index + 1}.</S.PropertyNumber>
              <S.PropertyWrapper>
                <S.PropertyIcon
                  src={property.property_image}
                  alt="property-image"
                />
                <div>
                  <S.PropertyName>{property.name}</S.PropertyName>
                  <S.PropertyUnits>
                    {property.houses?.length || 0} Units
                  </S.PropertyUnits>
                </div>
              </S.PropertyWrapper>
              <S.PropertyActions>
                {editingPropertyId !== property.id && (
                  <>
                    <S.EditButton
                      onClick={() => startEditingProperty(property)}
                    >
                      <FiEdit />
                    </S.EditButton>
                    <S.DeleteButton
                      onClick={() =>
                        confirmDeletion(property.id!, property.name)
                      }
                    >
                      <FiTrash2 />
                    </S.DeleteButton>
                  </>
                )}
              </S.PropertyActions>
            </S.PropertyMain>
            <S.EditFormContainer expanded={editingPropertyId === property.id}>
              {editingPropertyId === property.id && (
                <S.InputGroup>
                  <S.InputWrapper>
                    <S.InputLabel>Update Property Name</S.InputLabel>
                    <S.InputField
                      type="text"
                      value={propertyName}
                      onChange={(e) => setPropertyName(e.target.value)}
                      placeholder="Name"
                    />
                  </S.InputWrapper>
                  <S.InputWrapper>
                    <S.InputLabel>Update Property Image</S.InputLabel>
                    <S.FileInput
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setEditingPropertyImage(e.target.files?.[0] || null)
                      }
                    />
                    {editingPropertyImage && (
                      <S.ImagePreview
                        src={URL.createObjectURL(editingPropertyImage)}
                        alt="Image Preview"
                      />
                    )}
                  </S.InputWrapper>
                  <S.ButtonWrapper>
                    <S.StyledButton
                      $isVariantAccept
                      onClick={() => saveEditingProperty(property)}
                    >
                      Done
                    </S.StyledButton>
                    <S.StyledButton
                      onClick={(e) => {
                        e.stopPropagation();
                        cancelEditingProperty();
                      }}
                    >
                      Cancel
                    </S.StyledButton>
                  </S.ButtonWrapper>
                </S.InputGroup>
              )}
            </S.EditFormContainer>
          </S.PropertyItem>
        ))}
      </S.PropertiesList>
      {showModal && (
        <ConfirmationModal
          message={`Deleting ${
            propertyName || "this property"
          } will also delete all of its related data. Are you sure you want to proceed?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </S.PropertyListingContainer>
  );
};

export default PropertyListing;
