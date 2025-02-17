import React from "react";
import { useProperties } from "../redux/hooks/useProperties";
import SettingsPage from "../components/SettingsPage/SettingsPage";

const SettingsContainer: React.FC = () => {
  const {
    data: propertiesData,
    handleEditProperty,
    handleDeleteProperty,
    loading,
  } = useProperties();

  return (
    <SettingsPage
      isPropertyLoading={loading}
      propertiesData={propertiesData}
      onEditProperty={handleEditProperty}
      onDeleteProperty={handleDeleteProperty}
    />
  );
};

export default SettingsContainer;
