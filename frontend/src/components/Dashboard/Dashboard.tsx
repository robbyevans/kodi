import { useAdmins } from "../../redux/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../../redux/hooks/useProperties";

const AdminDashboardPage = () => {
  const { logout } = useAdmins();
  const navigate = useNavigate();
  const { data, loading, error } = useProperties(); // Fetch properties

  const handlePropertyClick = (propertyId: number) => {
    navigate(`/property/${propertyId}`); // Redirect to PropertyPage with propertyId
  };

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <h2>Your Properties</h2>
      <ul>
        {data.map((property) => (
          <li
            key={property.id}
            onClick={() => handlePropertyClick(property.id)}
          >
            {property.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboardPage;
