import React from "react";
import { useAdmins } from "../redux/hooks/useAdmin";
import ProfilePage from "../components/Profile/Profile";

const ProfileContainer: React.FC = () => {
  const { user, handleEditUser } = useAdmins();

  return <ProfilePage user={user} onEditUser={handleEditUser} />;
};

export default ProfileContainer;
