import React, { useEffect, useState } from "react";
import { ITenant } from "../../../redux/slices/tenantsSlice";
import { useTenants } from "../../../redux/hooks/useTenants";
import { IHouse } from "../../../redux/slices/houseSlice";
import * as S from "./styles";

interface AddTenantModalProps {
  house: IHouse;
  visible: boolean;
  onClose: () => void;
}

const AddTenantModal: React.FC<AddTenantModalProps> = ({
  house,
  visible,
  onClose,
}) => {
  const {
    tenants,
    getTenantByHouse,
    addNewTenant,
    handleDeleteTenant,
    handleEditTenant,
    loading,
  } = useTenants();

  const [tenantName, setTenantName] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [tenantPhone, setTenantPhone] = useState("");
  const [editingTenant, setEditingTenant] = useState<ITenant | null>(null);

  useEffect(() => {
    if (visible) {
      getTenantByHouse(house.id);
      resetForm();
    }
  }, [visible, house.id]);

  const resetForm = () => {
    setTenantName("");
    setTenantEmail("");
    setTenantPhone("");
    setEditingTenant(null);
  };

  const handleSubmit = () => {
    if (!tenantName || !tenantEmail || !tenantPhone) {
      alert("All fields are required.");
      return;
    }

    if (editingTenant) {
      handleEditTenant({
        id: editingTenant.id,
        name: tenantName,
        email: tenantEmail,
        phone_number: tenantPhone,
      });
    } else {
      addNewTenant(house.id, {
        name: tenantName,
        email: tenantEmail,
        phone_number: tenantPhone,
      });
    }

    resetForm();
  };

  if (!visible) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          {editingTenant
            ? `Edit Tenant - ${editingTenant.name}`
            : `Add Tenant to ${house.house_number}`}
        </S.ModalHeader>
        <S.FormContainer>
          <input
            placeholder="Name"
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
          />
          <input
            placeholder="Email"
            value={tenantEmail}
            onChange={(e) => setTenantEmail(e.target.value)}
          />
          <input
            placeholder="Phone"
            value={tenantPhone}
            onChange={(e) => setTenantPhone(e.target.value)}
          />
          <S.ButtonContainer>
            <S.CancelButton onClick={onClose}>Cancel</S.CancelButton>
            <S.SubmitButton onClick={handleSubmit}>
              {editingTenant ? "Save Changes" : "Add Tenant"}
            </S.SubmitButton>
          </S.ButtonContainer>
        </S.FormContainer>

        <h3>Existing Tenants</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <S.TenantList>
            {tenants.map((tenant: ITenant) => (
              <S.TenantItem key={tenant.id}>
                {tenant.name} - {tenant.email} - {tenant.phone_number}
                <S.TenantActions>
                  <button
                    onClick={() => {
                      setEditingTenant(tenant);
                      setTenantName(tenant.name);
                      setTenantEmail(tenant.email);
                      setTenantPhone(tenant.phone_number);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="danger"
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this tenant?"
                      );
                      if (confirmDelete) {
                        handleDeleteTenant(tenant.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </S.TenantActions>
              </S.TenantItem>
            ))}
          </S.TenantList>
        )}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default AddTenantModal;
