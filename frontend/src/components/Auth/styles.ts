import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f7fdf7; /* Light green background */
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #2e7d32; /* Dark green */
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  margin-bottom: 1rem;
  border: 1px solid #a5d6a7; /* Light green border */
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #2e7d32; /* Dark green on focus */
    box-shadow: 0 0 5px rgba(46, 125, 50, 0.5);
  }
`;

export const Button = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  background-color: #66bb6a; /* Green button */
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #43a047; /* Darker green */
  }

  &:disabled {
    background-color: #a5d6a7; /* Light green for disabled */
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: #d32f2f; /* Red for error messages */
  font-size: 0.9rem;
  margin-top: 1rem;
`;
