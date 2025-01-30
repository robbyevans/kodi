// File: /frontend/src/components/AdminDashboardPage/AdminDashboardPage.tsx
import { useState } from "react";
import { useAdmins } from "../../redux/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../../redux/hooks/useProperties";
import * as S from "./styles";
import AddPropertyModal from "../Modals/AddPropertyModal/AddPropertyModal"; // We'll create this component next

const AdminDashboardPage = () => {
  const { logout } = useAdmins();
  const navigate = useNavigate();
  const { data, loading, error } = useProperties(); // Fetch properties
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handlePropertyClick = (propertyId: number) => {
    navigate(`/property/${propertyId}`); // Redirect to PropertyPage with propertyId
  };

  const handleAddPropertyClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  if (loading)
    return <S.LoadingMessage>Loading properties...</S.LoadingMessage>;
  if (error) return <S.ErrorMessage>{error}</S.ErrorMessage>;

  return (
    <S.DashboardContainer>
      <S.DashboardHeader>Admin Dashboard</S.DashboardHeader>
      <S.ButtonContainer>
        <S.LogoutButton onClick={logout}>Logout</S.LogoutButton>
        <S.AddPropertyButton onClick={handleAddPropertyClick}>
          Add Property
        </S.AddPropertyButton>
      </S.ButtonContainer>
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
      <AddPropertyModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </S.DashboardContainer>
  );
};

export default AdminDashboardPage;
