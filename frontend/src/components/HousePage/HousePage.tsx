// File 3: /frontend/src/components/HousePage/HousePage.tsx

import { useEffect } from "react";
import { useHouses } from "../../redux/hooks/useHouses";

interface HousesPageProps {
  propertyId: number;
}

const HousesPage = ({ propertyId }: HousesPageProps) => {
  const { houses, getPropertyHouses, loading, error } = useHouses();

  useEffect(() => {
    getPropertyHouses(propertyId); // Fetch houses for the given propertyId when component mounts
  }, [propertyId, getPropertyHouses]); // Dependency array ensures the effect runs only when the propertyId changes

  if (loading) return <p>Loading houses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Houses</h1>
      <table>
        <thead>
          <tr>
            <th>House Number</th>
            <th>Rent Payable</th>
          </tr>
        </thead>
        <tbody>
          {houses &&
            houses.map((house) => (
              <tr key={house.id}>
                <td>{house.house_number}</td>
                <td>${house.payable_rent}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HousesPage;
