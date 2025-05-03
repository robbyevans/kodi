import React from "react";
import * as S from "./styles";
import PropertyListing from "../PropertyListing/PropertyListing";
import ProfileSection from "../ProfileSection/ProfileSection";
import { IProperty } from "../../redux/slices/propertiesSlice";
import { IUser } from "../../redux/slices/adminSlice";
import EmailConfirmationSection from "../EmailConfirmation/EmailConfirmationSection";

interface SettingsPageProps {
  propertiesData: IProperty[];
  isLoading: boolean;
  isUserEmailVerified: boolean;
  onEditProperty: (updatedProperty: IProperty) => void;
  onDeleteProperty: (id: number) => void;
  user: IUser;
  onEditUser: (data: FormData | { [key: string]: string | File }) => void;
  onLogout: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  propertiesData,
  isLoading,
  isUserEmailVerified,
  onEditProperty,
  onDeleteProperty,
  user,
  onEditUser,
  onLogout,
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
      {!isUserEmailVerified && <EmailConfirmationSection />}

      <PropertyListing
        isLoading={isLoading}
        propertiesData={propertiesData}
        onEditProperty={onEditProperty}
        onDeleteProperty={onDeleteProperty}
      />

      <S.LogoutWrapper>
        <S.LogoutButton onClick={onLogout}>Log Out</S.LogoutButton>
      </S.LogoutWrapper>
    </S.SettingsContainer>
  );
};

export default SettingsPage;
