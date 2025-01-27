// File: /frontend/src/components/Auth/AdminLogin.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../redux/hooks/useAdmin";

const AdminLoginPage = () => {
  const { isAuthenticated, loading, error, login, role } = useAdmins();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // useEffect hook to listen to changes in authentication and role
  useEffect(() => {
    if (isAuthenticated) {
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "systemAdmin") {
        navigate("/system-admin");
      }
    }
  }, [isAuthenticated, role, navigate]); // Dependency array includes both isAuthenticated and role

  const handleLogin = () => {
    login(email, password); // Trigger the login action
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminLoginPage;
