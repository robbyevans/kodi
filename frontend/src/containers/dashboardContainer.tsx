import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../redux/hooks/useProperties";
import { useTenants } from "../redux/hooks/useTenants";
import Dashboard from "../components/Dashboard/Dashboard";
import AddPropertyModal from "../components/Modals/AddPropertyModal/AddPropertyModal";
import * as S from "../components/Dashboard/styles";
import { getPropertyStats } from "../helpers/utils/getPropertyStats";

const DashboardContainer = () => {
  const navigate = useNavigate();
  const { data: propertyData, loading, error } = useProperties();
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

  const { totalUnits, occupancyRate, totalProperties, totalRevenuePercentage } =
    getPropertyStats(propertyData);

  return (
    <>
      <Dashboard
        data={propertyData}
        navigate={navigate}
        handleAddPropertyClick={handleAddPropertyClick}
        totalProperties={totalProperties}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
        totalRevenuePercentage={totalRevenuePercentage}
        totalUnits={totalUnits}
        occupancyRate={occupancyRate}
      />
      <AddPropertyModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default DashboardContainer;
