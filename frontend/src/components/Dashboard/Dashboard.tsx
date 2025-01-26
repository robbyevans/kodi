import { useAdmins } from "../../redux/hooks/useAdmin";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const { isAuthenticated, logout } = useAdmins();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/admin-login");
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
      {/* Display other dashboard elements here */}
    </div>
  );
};

export default AdminDashboardPage;
