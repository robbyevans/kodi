import React, { useState, useEffect } from "react";
import { useAdmins } from "../../redux/hooks/useAdmin";
import axiosInstance from "../../redux/utils";

const SystemAdminPage = () => {
  const { addNewAdmin } = useAdmins();
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "admin",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admins"); // Fetch all admins
      setAdmins(response.data);
      setError(null);
    } catch (err: any) {
      setError("Failed to fetch admins. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newAdmin.password !== newAdmin.passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const result = await addNewAdmin(
        newAdmin.email,
        newAdmin.password,
        newAdmin.passwordConfirmation,
        newAdmin.role
      );

      if (result.success) {
        setSuccess("Admin added successfully!");
        fetchAdmins(); // Refresh list
        setNewAdmin({
          email: "",
          password: "",
          passwordConfirmation: "",
          role: "admin",
        });
        setError(null);
      } else {
        setError(result.message || "Failed to add admin.");
      }
    } catch (err: any) {
      setError("An error occurred while adding the admin.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (adminId: number) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/admins/${adminId}`); // API to delete admin
      fetchAdmins();
      setSuccess("Admin deleted successfully!");
      setError(null);
    } catch (err: any) {
      setError("Failed to delete admin. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>System Admin Page</h1>
      <form onSubmit={handleAddAdmin}>
        <input
          type="email"
          placeholder="Email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newAdmin.password}
          onChange={(e) =>
            setNewAdmin({ ...newAdmin, password: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={newAdmin.passwordConfirmation}
          onChange={(e) =>
            setNewAdmin({ ...newAdmin, passwordConfirmation: e.target.value })
          }
          required
        />
        <select
          value={newAdmin.role}
          onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="systemAdmin">System Admin</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Adding Admin..." : "Add Admin"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <h2>All Admins</h2>
      {loading ? (
        <p>Loading admins...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin: any) => (
              <tr key={admin.id}>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
                <td>
                  <button onClick={() => handleDeleteAdmin(admin.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SystemAdminPage;
