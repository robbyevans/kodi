import React from "react";
import { useProperties } from "../redux/hooks/useProperties";
import SettingsPage from "../components/SettingsPage/SettingsPage";

const SettingsContainer: React.FC = () => {
  const {
    data: propertiesData,
    handleEditProperty,
    handleDeleteProperty,
  } = useProperties();

  return (
    <SettingsPage
      propertiesData={propertiesData}
      onEditProperty={handleEditProperty}
      onDeleteProperty={handleDeleteProperty}
    />
  );
};

export default SettingsContainer;
