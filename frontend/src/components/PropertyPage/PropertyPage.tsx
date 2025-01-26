import { useProperties } from "../../redux/hooks/useProperties";

const PropertiesPage = () => {
  const { data, loading, error } = useProperties();

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Properties</h1>
      <ul>
        {data.map((property) => (
          <li key={property.id}>{property.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PropertiesPage;
