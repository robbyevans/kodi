import React from "react";
import * as S from "./styles";
import ProfileSection from "../ProfileSection/ProfileSection";
import { IUser } from "../../redux/slices/adminSlice";

interface IProfileProps {
  user: IUser;
  onEditUser: (data: FormData | { [key: string]: string | File }) => void;
}

const ProfilePage: React.FC<IProfileProps> = ({ user, onEditUser }) => {
  return (
    <S.ProfilePageContainer data-testid="profile-page-container">
      <S.ProfileHeader>
        <h1>Profile</h1>
        <p>Manage your profile details below</p>
      </S.ProfileHeader>

      <ProfileSection user={user} onEditUser={onEditUser} />
    </S.ProfilePageContainer>
  );
};

export default ProfilePage;
