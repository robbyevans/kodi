import { useAdmins } from "../../redux/hooks/useAdmin";
import PropertiesList from "../Properties/PropertiesList";

const AdminDashboardPage = () => {
  const { logout } = useAdmins();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <PropertiesList />
    </div>
  );
};

export default AdminDashboardPage;
