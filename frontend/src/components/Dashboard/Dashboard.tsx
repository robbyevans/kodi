import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../../redux/hooks/useProperties";
import * as S from "./styles";
import AddPropertyModal from "../Modals/AddPropertyModal/AddPropertyModal";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useProperties();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPropertyClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading)
    return <S.LoadingMessage>Loading properties...</S.LoadingMessage>;
  if (error) return <S.ErrorMessage>{error}</S.ErrorMessage>;

  return (
    <S.DashboardContainer>
      <S.DashboardHeader>Admin Dashboard</S.DashboardHeader>

      <S.PropertyListContainer>
        <S.PropertyListHeading>Your Properties</S.PropertyListHeading>
        {data.map((property) => (
          <S.PropertyCard
            key={property.id}
            onClick={() => navigate(`/property/${property.id}`)}
          >
            <h3>{`${property.name} - ${property.houses?.length} units`}</h3>
            <span>View Details</span>
          </S.PropertyCard>
        ))}
      </S.PropertyListContainer>
      <S.ButtonContainer>
        <S.AddPropertyButton onClick={handleAddPropertyClick}>
          Add Property
        </S.AddPropertyButton>
      </S.ButtonContainer>
      <AddPropertyModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </S.DashboardContainer>
  );
};

export default AdminDashboardPage;
