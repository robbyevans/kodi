import React from "react";
import * as S from "./styles";
import PropertyListing from "../PropertyListing/PropertyListing";
import ProfileSection from "../ProfileSection/ProfileSection";
import { IProperty } from "../../redux/slices/propertiesSlice";
import { IUser } from "../../redux/slices/adminSlice";

interface SettingsPageProps {
  propertiesData: IProperty[];
  isLoading: boolean;
  onEditProperty: (updatedProperty: IProperty) => void;
  onDeleteProperty: (id: number) => void;
  user: IUser;
  onEditUser: (data: FormData | { [key: string]: string | File }) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  propertiesData,
  isLoading,
  onEditProperty,
  onDeleteProperty,
  user,
  onEditUser,
}) => {
  return (
    <S.SettingsContainer data-testid="settings-container">
      <S.SettingsHeader>
        <h1>Account Settings</h1>
        <p>Manage your account details and properties</p>
      </S.SettingsHeader>

      <ProfileSection
        isLoading={isLoading}
        user={user}
        onEditUser={onEditUser}
      />

      <PropertyListing
        isLoading={isLoading}
        propertiesData={propertiesData}
        onEditProperty={onEditProperty}
        onDeleteProperty={onDeleteProperty}
      />
    </S.SettingsContainer>
  );
};

export default SettingsPage;
