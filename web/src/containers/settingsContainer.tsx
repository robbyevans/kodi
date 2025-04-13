import React from "react";
import { useProperties } from "../redux/hooks/useProperties";
import SettingsPage from "../components/SettingsPage/SettingsPage";
import { useAdmins } from "../redux/hooks/useAdmin";

const SettingsContainer: React.FC = () => {
  const { user, handleEditUser } = useAdmins();
  const {
    data: propertiesData,
    handleEditProperty,
    handleDeleteProperty,
    loading,
  } = useProperties();

  return (
    <SettingsPage
      user={user}
      onEditUser={handleEditUser}
      isLoading={!loading}
      propertiesData={propertiesData}
      onEditProperty={handleEditProperty}
      onDeleteProperty={handleDeleteProperty}
    />
  );
};

export default SettingsContainer;
