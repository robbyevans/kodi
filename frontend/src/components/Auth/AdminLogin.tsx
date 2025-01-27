// File 1: /frontend/src/components/Auth/AdminLogin.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../redux/hooks/useAdmin";

const AdminLoginPage = () => {
  const { isAuthenticated, loading, error, login, signup } = useAdmins();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin-dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleAction = () => {
    if (isSignup) {
      signup(email, password, passwordConfirmation);
    } else {
      login(email, password);
    }
  };

  return (
    <div>
      <h1>{isSignup ? "Admin Signup" : "Admin Login"}</h1>
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
      {isSignup && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      )}
      <button onClick={handleAction} disabled={loading}>
        {loading
          ? isSignup
            ? "Signing up..."
            : "Logging in..."
          : isSignup
          ? "Signup"
          : "Login"}
      </button>
      {error && <p>{error}</p>}
      <p
        onClick={() => setIsSignup(!isSignup)}
        style={{ cursor: "pointer", color: "blue" }}
      >
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Signup"}
      </p>
    </div>
  );
};

export default AdminLoginPage;
