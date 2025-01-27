// File: /frontend/src/components/AdminDashboardPage/AdminDashboardPage.tsx
import { useAdmins } from "../../redux/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../../redux/hooks/useProperties";
import * as S from "./styles";

const AdminDashboardPage = () => {
  const { logout } = useAdmins();
  const navigate = useNavigate();
  const { data, loading, error } = useProperties(); // Fetch properties

  const handlePropertyClick = (propertyId: number) => {
    navigate(`/property/${propertyId}`); // Redirect to PropertyPage with propertyId
  };

  if (loading)
    return <S.LoadingMessage>Loading properties...</S.LoadingMessage>;
  if (error) return <S.ErrorMessage>{error}</S.ErrorMessage>;

  return (
    <S.DashboardContainer>
      <S.DashboardHeader>Admin Dashboard</S.DashboardHeader>
      <S.LogoutButton onClick={logout}>Logout</S.LogoutButton>
      <S.PropertyListContainer>
        <S.PropertyListHeading>Your Properties</S.PropertyListHeading>
        {data.map((property) => (
          <S.PropertyCard
            key={property.id}
            onClick={() => handlePropertyClick(property.id)}
          >
            <h3>{`${property.name} - ${property.houses?.length} units`}</h3>
            <span>View Details</span>
          </S.PropertyCard>
        ))}
      </S.PropertyListContainer>
    </S.DashboardContainer>
  );
};

export default AdminDashboardPage;
