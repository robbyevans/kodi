import { useState, useEffect } from "react";
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
    paymentRate,
  } = getPropertyStats(propertyData);

  // single clock state
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000); // every minute
    return () => clearInterval(timer);
  }, []);

  // formatted date/time
  const dateTime = now.toLocaleString();

  // choose greeting by hour
  const hour = now.getHours();
  const greetingText =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <>
      <Dashboard
        userData={userData}
        greetingText={greetingText}
        dateTime={dateTime}
        propertyData={propertyData}
        loading={loading}
        navigate={navigate}
        handleAddPropertyClick={handleAddPropertyClick}
        totalProperties={propertyData?.length || 0}
        totalRevenuePercentage={currentRevenueRate}
        totalUnits={totalUnits}
        occupancyRate={occupancyRate}
        paymentRate={paymentRate}
        totalTenants={totalTenants}
      />
      {/* <InstructionDashboard /> */}
      <AddPropertyModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default DashboardContainer;
