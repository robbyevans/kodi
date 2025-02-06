// File: /frontend/src/containers/SettingsContainer.tsx
import React from "react";
import { useAdmins } from "../redux/hooks/useAdmin";
import { useProperties } from "../redux/hooks/useProperties";
import SettingsPage from "../components/SettingsPage/SettingsPage";
import { IProperty } from "../redux/slices/propertiesSlice";

const SettingsContainer: React.FC = () => {
  const { user, handleEditAdmin } = useAdmins();
  const {
    data: properties,
    handleEditProperty,
    handleDeleteProperty,
  } = useProperties();

  // Handler for editing the user (profile)
  const onEditUser = (field: string, currentValue: string | undefined) => {
    const newValue = window.prompt(`Enter new ${field}`, currentValue);
    if (newValue && newValue !== currentValue) {
      // For now we assume that only email or name can be updated.
      // You can extend this logic as needed.
      handleEditAdmin({ [field]: newValue });
    }
  };

  // Handler for editing a property.
  // In this simple example, we only allow updating the property name.
  const onEditProperty = (propertyId: number) => {
    // Find the property from the list.
    const propertyToEdit: IProperty | undefined = properties.find(
      (prop) => prop.id === propertyId
    );
    if (!propertyToEdit) return;

    const newName = window.prompt(
      "Enter new property name:",
      propertyToEdit.name
    );
    if (newName && newName !== propertyToEdit.name) {
      // Create an updated property object.
      const updatedProperty: IProperty = {
        ...propertyToEdit,
        name: newName,
      };
      handleEditProperty(updatedProperty);
    }
  };

  // Handler for deleting a property.
  const onDeleteProperty = (propertyId: number) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (confirmation) {
      handleDeleteProperty(propertyId);
    }
  };

  return (
    <SettingsPage
      user={user}
      properties={properties}
      onEditUser={onEditUser}
      onEditProperty={onEditProperty}
      onDeleteProperty={onDeleteProperty}
    />
  );
};

export default SettingsContainer;
