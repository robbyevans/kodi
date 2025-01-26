import React from "react";
import { useProperties } from "../redux/properties/useProperties";

const PropertiesList: React.FC = () => {
  const { data, loading, error } = useProperties();

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>Error: {error}</p>;

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

export default PropertiesList;
