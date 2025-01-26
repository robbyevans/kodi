import { useHouses } from "../../redux/hooks/useHouses";

const HousesPage = () => {
  const { data, loading, error } = useHouses();

  if (loading) return <p>Loading houses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Houses</h1>
      <ul>
        {data.map((house) => (
          <li key={house.id}>
            House {house.house_number}, Rent: ${house.payable_rent}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HousesPage;
