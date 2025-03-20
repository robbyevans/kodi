import React from "react";
import * as S from "./styles";
import PropertyListing from "../PropertyListing/PropertyListing";
import { IProperty } from "../../redux/slices/propertiesSlice";
import ProfileSection from "../ProfileSection/ProfileSection";
import { IUser } from "../../redux/slices/adminSlice";

interface SettingsPageProps {
  propertiesData: IProperty[];
  isPropertyLoading: boolean;
  onEditProperty: (updatedProperty: IProperty) => void;
  onDeleteProperty: (id: number) => void;
  user: IUser;
  onEditUser: (data: FormData | { [key: string]: string | File }) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  propertiesData,
  isPropertyLoading,
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
      <ProfileSection user={user} onEditUser={onEditUser} />
      <PropertyListing
        isPropertyLoading={isPropertyLoading}
        propertiesData={propertiesData}
        onEditProperty={onEditProperty}
        onDeleteProperty={onDeleteProperty}
      />
    </S.SettingsContainer>
  );
};

export default SettingsPage;
