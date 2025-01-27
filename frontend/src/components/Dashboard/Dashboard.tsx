import { useAdmins } from "../../redux/hooks/useAdmin";

const AdminDashboardPage = () => {
  const { logout } = useAdmins();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
      {/* Display other dashboard elements here */}
    </div>
  );
};

export default AdminDashboardPage;
