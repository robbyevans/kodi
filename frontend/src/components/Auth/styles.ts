import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7fdf7;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #2e7d32;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  margin-bottom: 1rem;
  border: 1px solid #a5d6a7;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #2e7d32;
    box-shadow: 0 0 5px rgba(46, 125, 50, 0.5);
  }
`;

export const Button = styled.button`
  width: 100%;
  max-width: 435px;
  padding: 10px 15px;
  background-color: #66bb6a;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #43a047;
  }

  &:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

export const ToggleText = styled.p`
  color: #2e7d32;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

export const ToggleLink = styled.span`
  color: #43a047;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;

  &:hover {
    color: #2e7d32;
  }
`;

export const Divider = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: center;
  border-bottom: 1px solid #a5d6a7;
  line-height: 0.1em;
  margin: 2rem 0;

  span {
    background: #f7fdf7;
    padding: 0 10px;
    color: #2e7d32;
  }
`;
