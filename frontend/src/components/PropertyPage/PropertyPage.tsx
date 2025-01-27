import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHouses } from "../../redux/hooks/useHouses";
import { useProperties } from "../../redux/hooks/useProperties";
import HouseCard from "../HouseCard/HouseCard"; // Import HouseCard component

const PropertyPage = () => {
  const { propertyId } = useParams<{ propertyId: string }>(); // Get propertyId from the URL
  const { houses, getPropertyHouses, loading, error } = useHouses();
  const { getPropertyById, data } = useProperties(); // Fetch properties

  useEffect(() => {
    if (propertyId) {
      getPropertyById(Number(propertyId)); // Fetch property based on propertyId
      getPropertyHouses(Number(propertyId)); // Fetch houses based on propertyId
    }
  }, []);

  if (loading) return <p>Loading houses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Houses for {data[0]?.name} </h1>
      <div>
        {houses &&
          houses.map((house) => (
            <HouseCard key={house.id} house={house} /> // Render each house in a HouseCard
          ))}
      </div>
    </div>
  );
};

export default PropertyPage;
