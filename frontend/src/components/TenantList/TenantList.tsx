import React from "react";
import { useTenants } from "../redux/tenants/useTenants";

const TenantList: React.FC = () => {
  const { data, loading, error } = useTenants();

  if (loading) return <p>Loading tenants...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Tenants</h1>
      <ul>
        {data.map((tenant) => (
          <li key={tenant.id}>
            {tenant.name} - {tenant.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TenantList;
