import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../redux/hooks/useProperties";
import { useHouses } from "../redux/hooks/useHouses";
import { useTenants } from "../redux/hooks/useTenants";
import Dashboard from "../components/Dashboard/Dashboard";
import AddPropertyModal from "../components/Modals/AddPropertyModal/AddPropertyModal";
import * as S from "../components/Dashboard/styles";
import { getPropertyStats } from "../helpers/utils/getPropertyStats";

const DashboardContainer = () => {
  const navigate = useNavigate();
  const { data: propertyData, loading, error } = useProperties();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { houses, getAllHouses } = useHouses();
  const { tenants } = useTenants();

  console.log("houses", houses);

  const handleAddPropertyClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // const [date, setDate] = useState(new Date());
  // useEffect(() => {
  //   const timer = setInterval(() => setDate(new Date()), 1000);
  //   return () => clearInterval(timer);
  // }, []);

  // const formattedDate = date.toLocaleDateString();
  // const formattedTime = date.toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  // (Optional) Any additional logic when tenants update
  useEffect(() => {
    getAllHouses();
  }, []);

  if (loading)
    return <S.LoadingMessage>Loading properties...</S.LoadingMessage>;
  if (error) return <S.ErrorMessage>{error}</S.ErrorMessage>;

  const {
    occupancyRate,
    totalRevenuePercentage,
    totalRevenueIfFullyOccupied,
    totalCurrentRevenue,
  } = getPropertyStats(propertyData);

  console.log("totalRevenueIfFullyOccupied", totalRevenueIfFullyOccupied);
  console.log("totalCurrentRevenue", totalCurrentRevenue);

  return (
    <>
      <Dashboard
        data={propertyData}
        navigate={navigate}
        handleAddPropertyClick={handleAddPropertyClick}
        totalProperties={propertyData?.length}
        formattedDate={"0"}
        formattedTime={"0"}
        totalRevenuePercentage={totalRevenuePercentage}
        totalUnits={houses?.length}
        occupancyRate={occupancyRate}
      />
      <AddPropertyModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default DashboardContainer;
