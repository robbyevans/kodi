import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../redux/hooks/useProperties";
import { useAdmins } from "../redux/hooks/useAdmin";
import Dashboard from "../components/Dashboard/Dashboard";
import AddPropertyModal from "../components/Modals/AddPropertyModal/AddPropertyModal";
import { getPropertyStats } from "../helpers/utils/getPropertyStats";
// import InstructionDashboard from "../components/Instructions/InstructionDashboard";

const DashboardContainer = () => {
  const navigate = useNavigate();
  const { data: propertyData, loading } = useProperties();
  const { user: userData } = useAdmins();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPropertyClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const {
    totalUnits,
    occupancyRate,
    currentRevenueRate,
    totalTenants,
    averageRent,
    vacancyRate,
  } = getPropertyStats(propertyData);

  return (
    <>
      <Dashboard
        userData={userData}
        propertyData={propertyData}
        loading={loading}
        navigate={navigate}
        handleAddPropertyClick={handleAddPropertyClick}
        totalProperties={propertyData?.length || 0}
        totalRevenuePercentage={currentRevenueRate}
        totalUnits={totalUnits}
        occupancyRate={occupancyRate}
        totalTenants={totalTenants}
        averageRent={averageRent}
        vacancyRate={vacancyRate}
      />
      {/* <InstructionDashboard /> */}
      <AddPropertyModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default DashboardContainer;
