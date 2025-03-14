import React from "react";
import * as S from "./styles";
import PropertyListing from "../PropertyListing/PropertyListing";
import { IProperty } from "../../redux/slices/propertiesSlice";

interface SettingsPageProps {
  propertiesData: IProperty[];
  isPropertyLoading: boolean;
  onEditProperty: (updatedProperty: IProperty) => void;
  onDeleteProperty: (id: number) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  propertiesData,
  isPropertyLoading,
  onEditProperty,
  onDeleteProperty,
}) => {
  return (
    <S.SettingsContainer data-testid="settings-container">
      <S.SettingsHeader>
        <h1>Account Settings</h1>
        <p>Manage your account details and properties</p>
      </S.SettingsHeader>
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
