import React, { useState } from "react";
import { useAdmins } from "../../redux/hooks/useAdmin";
import * as S from "./styles";

const SettingsPage = () => {
  const { currentAdmin, updateAdmin } = useAdmins();
  const [email, setEmail] = useState(currentAdmin?.email || "");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAdmin) {
      await updateAdmin({
        admin_id: currentAdmin.admin_id,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
    }
  };

  return (
    <S.SettingsContainer>
      <h2>Account Settings</h2>
      <form onSubmit={handleSubmit}>
        <S.FormGroup>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </S.FormGroup>
        <S.FormGroup>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </S.FormGroup>
        <S.FormGroup>
          <label>Confirm Password</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </S.FormGroup>
        <S.SaveButton type="submit">Save Changes</S.SaveButton>
      </form>
    </S.SettingsContainer>
  );
};

export default SettingsPage;
