import { useState } from "react";
import { useAdmins } from "../../redux/hooks/useAdmin";
import * as S from "./styles";

const AdminLoginPage = () => {
  const { loading, error, login } = useAdmins();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <S.Container>
      <S.Title>Admin Login</S.Title>
      <S.Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <S.Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <S.Button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </S.Button>
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Container>
  );
};

export default AdminLoginPage;
