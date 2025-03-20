import React, { useState } from "react";
import * as S from "./styles";
import WithdrawalForm from "../WithdrawalForm/WithdrawalForm";
import WalletInfo from "../WalletInfo/WalletInfo";
import LedgerHistoryModal from "../LedgerHistoryModal/LedgerHistoryModal";
import { IUser } from "../../redux/slices/adminSlice";

interface IProfileProps {
  user: IUser;
  onEditUser: (data: FormData | { [key: string]: string | File }) => void;
}

const ProfilePage: React.FC<IProfileProps> = ({ user, onEditUser }) => {
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
  console.log("user", user);
  console.log("onEditUser", onEditUser);

  return (
    <S.ProfilePageContainer data-testid="profile-page-container">
      <S.ProfileHeader>
        <h1>Profile</h1>
        <p>Manage your profile details below</p>
      </S.ProfileHeader>

      <WalletInfo />
      <WithdrawalForm />

      <S.LedgerButton onClick={() => setIsLedgerModalOpen(true)}>
        View Ledger History
      </S.LedgerButton>

      {isLedgerModalOpen && (
        <LedgerHistoryModal
          isOpen={isLedgerModalOpen}
          onClose={() => setIsLedgerModalOpen(false)}
        />
      )}
    </S.ProfilePageContainer>
  );
};

export default ProfilePage;
