// File: /frontend/src/components/SettingsPage/SettingsPage.tsx
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import * as S from "./styles";
import { IProperty } from "../../redux/slices/propertiesSlice";
import { IUser } from "../../redux/slices/adminSlice";
import profilePlaceholder from "../../assets/profile-placeholder-preview.png";

interface SettingsPageProps {
  user: IUser;
  properties: IProperty[];
  onEditUser: (field: string, value: string | undefined) => void;
  onEditProperty: (id: number) => void;
  onDeleteProperty: (id: number) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  user,
  properties = [],
  onEditUser,
  onEditProperty,
  onDeleteProperty,
}) => {
  return (
    <S.SettingsContainer data-testid="settings-container">
      <S.SettingsHeader>
        <div>
          <h1>Account Settings</h1>
          <p>Manage your account details and properties</p>
        </div>
      </S.SettingsHeader>

      <S.ContentWrapper>
        <S.UserInfoSection>
          <S.SectionHeader>
            <h2>Profile Information</h2>
          </S.SectionHeader>

          <S.ProfileContainer>
            {/* If you have a profile image, otherwise leave empty or provide a placeholder */}
            <S.ProfileImage
              src={user?.profileImage || profilePlaceholder}
              alt="Profile"
            />
            <S.EditableFields>
              <S.EditableField>
                <div>
                  <S.FieldLabel>Full Name</S.FieldLabel>
                  <S.FieldValue>{user?.name || "N/A"}</S.FieldValue>
                </div>
                <S.EditButton onClick={() => onEditUser("name", user?.name)}>
                  <FiEdit />
                </S.EditButton>
              </S.EditableField>

              <S.EditableField>
                <div>
                  <S.FieldLabel>Email Address</S.FieldLabel>
                  <S.FieldValue>{user?.email}</S.FieldValue>
                </div>
                <S.EditButton onClick={() => onEditUser("email", user?.email)}>
                  <FiEdit />
                </S.EditButton>
              </S.EditableField>

              {/* If phone is not defined in IUser you can remove or update this field */}
              <S.EditableField>
                <div>
                  <S.FieldLabel>Phone Number</S.FieldLabel>
                  <S.FieldValue>{(user as any)?.phone || "N/A"}</S.FieldValue>
                </div>
                <S.EditButton
                  onClick={() => onEditUser("phone", (user as any)?.phone)}
                >
                  <FiEdit />
                </S.EditButton>
              </S.EditableField>
            </S.EditableFields>
          </S.ProfileContainer>
        </S.UserInfoSection>

        <S.PropertiesSection>
          <S.SectionHeader>
            <h2>Managed Properties</h2>
          </S.SectionHeader>

          <S.PropertiesList>
            {properties.map((property) => (
              <S.PropertyItem key={property?.id}>
                <div>
                  <S.PropertyName>{property?.name}</S.PropertyName>
                  <S.PropertyUnits>
                    {property?.houses?.length || 0} Units
                  </S.PropertyUnits>
                </div>
                <S.PropertyActions>
                  <S.EditPropertyButton
                    onClick={() => onEditProperty(property.id!)}
                  >
                    <FiEdit />
                  </S.EditPropertyButton>
                  <S.DeletePropertyButton
                    onClick={() => onDeleteProperty(property.id!)}
                  >
                    <FiTrash2 />
                  </S.DeletePropertyButton>
                </S.PropertyActions>
              </S.PropertyItem>
            ))}
          </S.PropertiesList>
        </S.PropertiesSection>
      </S.ContentWrapper>
    </S.SettingsContainer>
  );
};

export default SettingsPage;
