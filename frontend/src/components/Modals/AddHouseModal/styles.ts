import styled from "styled-components";

// Overlay covers the entire viewport with a semi-transparent background.
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

// ModalContent is the container for the modal dialog.
export const ModalContent = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// ModalHeader displays the title in a bold style.
export const ModalHeader = styled.h2`
  margin: 0 0 1.5rem;
  text-align: center;
  color: #333;
`;

// FormGroup groups the label and input together.
export const FormGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    color: #555;
    font-weight: 500;
  }

  input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
`;

// ButtonContainer to hold the Cancel and Submit buttons side by side.
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  gap: 1rem;
`;

// CancelButton styles the cancel action.
export const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #ccc;
  border: none;
  border-radius: 4px;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #bbb;
  }
`;

// SubmitButton styles the submit action.
export const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #006ae0;
  }
`;
