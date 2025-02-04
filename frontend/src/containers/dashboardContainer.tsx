import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../redux/hooks/useProperties";
import { useTenants } from "../redux/hooks/useTenants";
import Dashboard from "../components/Dashboard/Dashboard";
import AddPropertyModal from "../components/Modals/AddPropertyModal/AddPropertyModal";
import * as S from "../components/Dashboard/styles";

const DashboardContainer = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useProperties();
  const { tenants } = useTenants();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPropertyClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // (Optional) Any additional logic when tenants update
  useEffect(() => {
    // ... your logic if needed
  }, [tenants]);

  if (loading)
    return <S.LoadingMessage>Loading properties...</S.LoadingMessage>;
  if (error) return <S.ErrorMessage>{error}</S.ErrorMessage>;

  // Calculate total units across all properties
  const totalUnits = data.reduce(
    (acc, property) => acc + (property.houses?.length || 0),
    0
  );

  // Calculate total occupied units (houses with a tenant)
  const totalOccupied = data.reduce((acc, property) => {
    const occupied =
      property.houses?.filter((house) => house.tenant).length || 0;
    return acc + occupied;
  }, 0);

  // Calculate occupancy rate as a percentage
  const occupancyRate =
    totalUnits > 0 ? Math.round((totalOccupied / totalUnits) * 100) : 0;

  return (
    <>
      <Dashboard
        data={data}
        navigate={navigate}
        handleAddPropertyClick={handleAddPropertyClick}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
        totalUnits={totalUnits}
        occupancyRate={occupancyRate}
      />
      <AddPropertyModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default DashboardContainer;
