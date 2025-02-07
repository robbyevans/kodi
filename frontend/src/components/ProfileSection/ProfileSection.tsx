import React, { useState } from "react";
import { FiEdit, FiCheck, FiX } from "react-icons/fi";
import profilePlaceholder from "../../assets/profile-placeholder-preview.png";
import * as S from "./styles";
import { IUser } from "../../redux/slices/adminSlice";

interface ProfileSectionProps {
  user: IUser;
  onEditUser: (data: { [key: string]: string }) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  user,
  onEditUser,
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState<string>("");

  const startEditingField = (
    field: string,
    currentValue: string | undefined
  ) => {
    setEditingField(field);
    setFieldValue(currentValue || "");
  };

  const cancelEditingField = () => {
    setEditingField(null);
    setFieldValue("");
  };

  const saveEditingField = () => {
    if (fieldValue) {
      onEditUser({ [editingField!]: fieldValue });
      setEditingField(null);
      setFieldValue("");
    }
  };

  return (
    <S.ProfileContainer>
      <S.ProfileHeader>
        <h2>Profile Information</h2>
      </S.ProfileHeader>
      <S.ProfileContent>
        <S.ProfileImage
          src={user.profile_image || profilePlaceholder}
          alt="Profile"
        />
        <S.ProfileDetails>
          <S.DetailItem>
            <S.DetailLabel>Full Name</S.DetailLabel>
            {editingField === "name" ? (
              <S.InputGroup>
                <S.InputField
                  type="text"
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                />
                <S.IconButton onClick={saveEditingField}>
                  <FiCheck />
                </S.IconButton>
                <S.IconButton onClick={cancelEditingField}>
                  <FiX />
                </S.IconButton>
              </S.InputGroup>
            ) : (
              <S.DetailValue>
                {user.name || "N/A"}
                <S.IconButton
                  onClick={() => startEditingField("name", user.name)}
                >
                  <FiEdit />
                </S.IconButton>
              </S.DetailValue>
            )}
          </S.DetailItem>
          <S.DetailItem>
            <S.DetailLabel>Email Address</S.DetailLabel>
            {editingField === "email" ? (
              <S.InputGroup>
                <S.InputField
                  type="email"
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                />
                <S.IconButton onClick={saveEditingField}>
                  <FiCheck />
                </S.IconButton>
                <S.IconButton onClick={cancelEditingField}>
                  <FiX />
                </S.IconButton>
              </S.InputGroup>
            ) : (
              <S.DetailValue>
                {user.email}
                <S.IconButton
                  onClick={() => startEditingField("email", user.email)}
                >
                  <FiEdit />
                </S.IconButton>
              </S.DetailValue>
            )}
          </S.DetailItem>
          <S.DetailItem>
            <S.DetailLabel>Phone Number</S.DetailLabel>
            {editingField === "phone_number" ? (
              <S.InputGroup>
                <S.InputField
                  type="text"
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                />
                <S.IconButton onClick={saveEditingField}>
                  <FiCheck />
                </S.IconButton>
                <S.IconButton onClick={cancelEditingField}>
                  <FiX />
                </S.IconButton>
              </S.InputGroup>
            ) : (
              <S.DetailValue>
                {user.phone_number || "N/A"}
                <S.IconButton
                  onClick={() =>
                    startEditingField("phone_number", user.phone_number)
                  }
                >
                  <FiEdit />
                </S.IconButton>
              </S.DetailValue>
            )}
          </S.DetailItem>
        </S.ProfileDetails>
      </S.ProfileContent>
    </S.ProfileContainer>
  );
};

export default ProfileSection;
