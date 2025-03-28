import React, { useEffect, useState } from "react";
import { ITenant } from "../../../redux/slices/tenantsSlice";
import { useTenants } from "../../../redux/hooks/useTenants";
import { IHouse } from "../../../redux/slices/houseSlice";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import * as S from "./styles";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

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
  const [tenantNationalId, setTenantNationalId] = useState("");
  const [editingTenant, setEditingTenant] = useState<ITenant | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    nationalId: "",
  });

  const hasTenant = tenants && tenants.length > 0;

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
    setTenantNationalId("");
    setEditingTenant(null);
    setErrors({
      name: "",
      email: "",
      phone: "",
      nationalId: "",
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: tenantName ? "" : "Full name is required",
      email: tenantEmail ? "" : "Email is required",
      phone: tenantPhone ? "" : "Phone number is required",
      nationalId: tenantNationalId ? "" : "National ID is required",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editingTenant) {
      handleEditTenant(house.id, {
        id: editingTenant.id,
        name: tenantName,
        email: tenantEmail,
        phone_number: tenantPhone,
        national_id: tenantNationalId,
      });
    } else {
      addNewTenant(house.id, {
        name: tenantName,
        email: tenantEmail,
        phone_number: tenantPhone,
        national_id: tenantNationalId,
      });
    }
    resetForm();
  };

  if (!visible) return null;

  return (
    <ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          <S.CloseButton onClick={onClose}>
            <IoClose size={20} color="red" />
          </S.CloseButton>
          {editingTenant
            ? `Edit Tenant - ${editingTenant.name}`
            : hasTenant
            ? `Tenant for House ${house.house_number}`
            : `Add Tenant to ${house.house_number}`}
        </S.ModalHeader>

        {!hasTenant || editingTenant ? (
          <>
            <S.FormContainer>
              <S.InputField
                placeholder="Full Names"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
              />
              {errors.name && <S.ErrorMessage>{errors.name}</S.ErrorMessage>}

              <S.InputField
                placeholder="Email Address"
                value={tenantEmail}
                onChange={(e) => setTenantEmail(e.target.value)}
              />
              {errors.email && <S.ErrorMessage>{errors.email}</S.ErrorMessage>}

              <S.InputField
                placeholder="Phone Number"
                value={tenantPhone}
                onChange={(e) => setTenantPhone(e.target.value)}
              />
              {errors.phone && <S.ErrorMessage>{errors.phone}</S.ErrorMessage>}

              <S.InputField
                placeholder="National ID"
                value={tenantNationalId}
                onChange={(e) => setTenantNationalId(e.target.value)}
              />
              {errors.nationalId && (
                <S.ErrorMessage>{errors.nationalId}</S.ErrorMessage>
              )}

              <S.ButtonContainer>
                <S.CancelButton onClick={onClose}>Cancel</S.CancelButton>
                <S.SubmitButton onClick={handleSubmit}>
                  {editingTenant ? "Save Changes" : "Add Tenant"}
                </S.SubmitButton>
              </S.ButtonContainer>
            </S.FormContainer>
          </>
        ) : loading ? (
          <S.StatusMessage>Loading...</S.StatusMessage>
        ) : (
          <S.TenantList>
            {tenants.map((tenant: ITenant) => (
              <S.TenantItem key={tenant.id}>
                <div>
                  <S.TenantName>{tenant.name}</S.TenantName>
                  <S.TenantDetails>
                    {tenant.email} | {tenant.phone_number} |{" "}
                    {tenant.national_id}
                  </S.TenantDetails>
                </div>
                <S.TenantActions>
                  <S.EditButton
                    onClick={() => {
                      setEditingTenant(tenant);
                      setTenantName(tenant.name);
                      setTenantEmail(tenant.email);
                      setTenantPhone(tenant.phone_number);
                      setTenantNationalId(tenant.national_id);
                    }}
                  >
                    <FiEdit />
                  </S.EditButton>
                  <S.DeleteButton
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this tenant?"
                        )
                      ) {
                        handleDeleteTenant(house.id, tenant.id);
                      }
                    }}
                  >
                    <FiTrash2 />
                  </S.DeleteButton>
                </S.TenantActions>
              </S.TenantItem>
            ))}
          </S.TenantList>
        )}
      </S.ModalContent>
    </ModalOverlay>
  );
};

export default AddTenantModal;
