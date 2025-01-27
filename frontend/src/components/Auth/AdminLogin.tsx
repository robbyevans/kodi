import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../redux/hooks/useAdmin";

const AdminLoginPage = () => {
  const { isAuthenticated, loading, error, login, role } = useAdmins();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log("isAuthenticated", isAuthenticated);
  console.log("role", role);

  useEffect(() => {
    if (isAuthenticated && role === "admin") {
      navigate("/admin-dashboard");
    } else if (isAuthenticated && role === "systemAdmin") {
      navigate("/system-admin");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    login(email, password);
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
