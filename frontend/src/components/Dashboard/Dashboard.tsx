// File 1: /frontend/src/components/Dashboard/Dashboard.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../../redux/hooks/useProperties";
import { useTenants } from "../../redux/hooks/useTenants";
import { FiPlus } from "react-icons/fi";
import * as S from "./styles";
import AddPropertyModal from "../Modals/AddPropertyModal/AddPropertyModal";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useProperties();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tenants } = useTenants();

  const handleAddPropertyClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    console.log("tenants", tenants);
  }, [tenants]);

  if (loading)
    return <S.LoadingMessage>Loading properties...</S.LoadingMessage>;
  if (error) return <S.ErrorMessage>{error}</S.ErrorMessage>;

  return (
    <S.DashboardContainer>
      <S.DashboardHeader>
        <h1>Property Management Dashboard</h1>
        <p>Manage your properties efficiently</p>
      </S.DashboardHeader>

      <S.ContentWrapper>
        <S.PropertyListContainer>
          <S.PropertyListHeader>
            <h2>Your Properties</h2>
            <S.AddPropertyButton onClick={handleAddPropertyClick}>
              <FiPlus />
              Add Property
            </S.AddPropertyButton>
          </S.PropertyListHeader>

          {data.length > 0 ? (
            <S.PropertyGrid>
              {data.map((property) => (
                <S.PropertyCard
                  key={property.id}
                  onClick={() => navigate(`/property/${property.id}`)}
                >
                  <S.PropertyImage />
                  <S.PropertyInfo>
                    <h3>{property.name}</h3>
                    <S.PropertyStats>
                      <span>{property?.houses?.length || 0} Units</span>
                      <span>•</span>
                      <span>KSH 1,200,000 Revenue</span>
                    </S.PropertyStats>
                  </S.PropertyInfo>
                  <S.ViewDetailsButton>View Details →</S.ViewDetailsButton>
                </S.PropertyCard>
              ))}
            </S.PropertyGrid>
          ) : (
            <S.EmptyState>
              <h3>No Properties Found</h3>
              <p>Start by adding your first property</p>
              <S.AddPropertyButton onClick={handleAddPropertyClick}>
                <FiPlus />
                Add Property
              </S.AddPropertyButton>
            </S.EmptyState>
          )}
        </S.PropertyListContainer>

        <S.SidePanel>
          <S.QuickStats>
            <h3>Quick Stats</h3>
            <S.StatItem>
              <span>Total Properties</span>
              <strong>{data.length}</strong>
            </S.StatItem>
            <S.StatItem>
              <span>Total Units</span>
              <strong>
                {data.reduce(
                  (acc, curr) => acc + (curr.houses?.length || 0),
                  0
                )}
              </strong>
            </S.StatItem>
            <S.StatItem>
              <span>Occupancy Rate</span>
              <strong>85%</strong>
            </S.StatItem>
          </S.QuickStats>
        </S.SidePanel>
      </S.ContentWrapper>

      <AddPropertyModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </S.DashboardContainer>
  );
};

export default AdminDashboardPage;
