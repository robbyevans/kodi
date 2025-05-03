import React from "react";
import { useProperties } from "../redux/hooks/useProperties";
import SettingsPage from "../components/SettingsPage/SettingsPage";
import { useAdmins } from "../redux/hooks/useAdmin";

const SettingsContainer: React.FC = () => {
  const {
    user,
    handleEditUser,
    loading: isUserDataLoading,
    isUserEmailVerified,
    handleLogout,
  } = useAdmins();
  const {
    data: propertiesData,
    handleEditProperty,
    handleDeleteProperty,
    loading: isPropertyDataLoading,
  } = useProperties();

  return (
    <SettingsPage
      isUserEmailVerified={isUserEmailVerified}
      user={user}
      onEditUser={handleEditUser}
      isLoading={isUserDataLoading && isPropertyDataLoading}
      propertiesData={propertiesData}
      onEditProperty={handleEditProperty}
      onDeleteProperty={handleDeleteProperty}
      onLogout={handleLogout}
    />
  );
};

export default SettingsContainer;
