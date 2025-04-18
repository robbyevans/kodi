// File: /web/src/components/PropertyListing/PropertyListing.tsx
import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import * as S from "./styles";
import { IProperty } from "../../redux/slices/propertiesSlice";
import ConfirmationModal from "../Modals/ConfirmationModal/ConfirmationModal";
import PropertyListingSkeleton from "./PropertyListingSkeleton";

interface PropertyListingProps {
  propertiesData: IProperty[];
  isLoading: boolean;
  onEditProperty: (updatedProperty: IProperty) => void;
  onDeleteProperty: (id: number) => void;
}

const PropertyListing: React.FC<PropertyListingProps> = ({
  propertiesData,
  isLoading,
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
  const [location, setLocation] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);

  const startEditingProperty = (property: IProperty) => {
    setEditingPropertyId(property.id!);
    setPropertyName(property.name);
    setLocation(property.location || "");
    setAddress(property.address || "");
    setEditingPropertyImage(null);
  };

  const cancelEditingProperty = () => {
    setEditingPropertyId(null);
    setPropertyName("");
    setLocation("");
    setAddress("");
    setEditingPropertyImage(null);
  };

  const handleMainClick = (property: IProperty) => {
    if (editingPropertyId === property.id) {
      cancelEditingProperty();
    } else {
      startEditingProperty(property);
    }
  };

  const saveEditingProperty = (property: IProperty) => {
    const updatedProperty: IProperty = {
      ...property,
      name: propertyName,
      location: location,
      address: address,
      property_image: editingPropertyImage
        ? editingPropertyImage
        : property.property_image,
    };
    onEditProperty(updatedProperty);
    cancelEditingProperty();
  };

  const confirmDeletion = (id: number, name: string) => {
    setPropertyToDelete(id);
    setPropertyName(name);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditingPropertyImage(file);
    }
  };

  return (
    <>
      {isLoading ? (
        <PropertyListingSkeleton />
      ) : (
        <S.PropertyListingContainer>
          <S.ListingHeader>
            <h2>Managed Properties</h2>
          </S.ListingHeader>
          <S.PropertiesList>
            {propertiesData.map((property, index) => (
              <S.PropertyItem key={property.id}>
                <S.PropertyMain onClick={() => handleMainClick(property)}>
                  <S.PropertyNumber>{index + 1}.</S.PropertyNumber>
                  <S.PropertyWrapper>
                    <S.PropertyIcon
                      src={
                        typeof property.property_image === "string"
                          ? property.property_image
                          : property.property_image
                          ? URL.createObjectURL(property.property_image)
                          : "/apartment-placeholder.png"
                      }
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
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditingProperty(property);
                          }}
                        >
                          <FiEdit />
                        </S.EditButton>
                        <S.DeleteButton
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDeletion(property.id!, property.name);
                          }}
                        >
                          <FiTrash2 />
                        </S.DeleteButton>
                      </>
                    )}
                  </S.PropertyActions>
                </S.PropertyMain>

                {/* Render the edit form if this property is being edited */}
                {editingPropertyId === property.id && (
                  <S.EditFormContainer
                    expanded
                    onClick={(e) => e.stopPropagation()}
                  >
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
                        <S.InputLabel>Update Location</S.InputLabel>
                        <S.InputField
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Location"
                        />
                      </S.InputWrapper>
                      <S.InputWrapper>
                        <S.InputLabel>Update Address</S.InputLabel>
                        <S.InputField
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Address"
                        />
                      </S.InputWrapper>
                      <S.InputWrapper>
                        <S.InputLabel>Update Property Image</S.InputLabel>
                        <S.FileInput
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            saveEditingProperty(property);
                          }}
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
                  </S.EditFormContainer>
                )}
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
      )}
    </>
  );
};

export default PropertyListing;
