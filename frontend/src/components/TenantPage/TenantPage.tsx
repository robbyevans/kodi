import { useTenants } from "../../redux/hooks/useTenants";

const TenantsPage = () => {
  const { data, loading, error } = useTenants();

  if (loading) return <p>Loading tenants...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Tenants</h1>
      <ul>
        {data.map((tenant) => (
          <li key={tenant.id}>{tenant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TenantsPage;
