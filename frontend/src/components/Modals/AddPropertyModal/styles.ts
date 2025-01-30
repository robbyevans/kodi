import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

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
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
`;

export const ModalHeader = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #034d3c;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #053a2f;
  }

  input {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #d0e6db;
    border-radius: 8px;
  }
`;

export const CancelButton = styled.button`
  background-color: #f44336; /* Red */
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d32f2f; /* Slightly darker red */
  }
`;

export const SubmitButton = styled.button`
  background-color: #34a853; /* Green */
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2c8d45; /* Slightly darker green */
  }
`;
