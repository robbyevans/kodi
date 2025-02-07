import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../redux/hooks/useProperties";
import { useAdmins } from "../redux/hooks/useAdmin";
import Dashboard from "../components/Dashboard/Dashboard";
import AddPropertyModal from "../components/Modals/AddPropertyModal/AddPropertyModal";
import * as S from "../components/Dashboard/styles";
import { getPropertyStats } from "../helpers/utils/getPropertyStats";

const DashboardContainer = () => {
  const navigate = useNavigate();
  const { data: propertyData, loading, error } = useProperties();
  const { data: userData } = useAdmins();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPropertyClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (loading)
    return <S.LoadingMessage>Loading properties...</S.LoadingMessage>;
  if (error) return <S.ErrorMessage>{error}</S.ErrorMessage>;

  const { totalUnits, occupancyRate, currentRevenueRate } =
    getPropertyStats(propertyData);

  return (
    <>
      <Dashboard
        userData={userData}
        propertyData={propertyData}
        navigate={navigate}
        handleAddPropertyClick={handleAddPropertyClick}
        totalProperties={propertyData?.length}
        formattedDate={"0"}
        formattedTime={"0"}
        totalRevenuePercentage={currentRevenueRate}
        totalUnits={totalUnits}
        occupancyRate={occupancyRate}
      />
      <AddPropertyModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default DashboardContainer;
