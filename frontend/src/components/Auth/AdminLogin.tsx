import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../redux/hooks/useAdmin";
import * as S from "./styles";

const AdminLoginPage = () => {
  const { isAuthenticated, loading, error, login, role } = useAdmins();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "systemAdmin") {
        navigate("/system-admin");
      }
    }
  }, [isAuthenticated, role, navigate]);

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
