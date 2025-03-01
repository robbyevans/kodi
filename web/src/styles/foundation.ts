import styled from "styled-components";

export const colors = {
  primary: "#034d3c", // Deep Teal
  secondary: "#2d6a4f", // Muted Forest Green
  accent: "#d4af37", // Gold
  neutral: {
    100: "#f8f9fa",
    200: "#e9ecef",
    300: "#dee2e6",
    500: "#6c757d",
    700: "#495057",
    900: "#212529",
  },
  text: {
    primary: "#212529",
    secondary: "#495057",
    inverted: "#f8f9fa",
  },
  background: "#ffffff",
  error: "#dc3545",
  success: "#28a745",
  warning: "#ffc107",
};

export const fonts = {
  primary: "'Inter', sans-serif",
  secondary: "'Merriweather', serif",
};

export const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
};

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
};

export const shadows = {
  sm: "0 1px 3px rgba(0,0,0,0.12)",
  md: "0 4px 6px rgba(0,0,0,0.1)",
  lg: "0 10px 15px rgba(0,0,0,0.1)",
  xl: "0 20px 25px rgba(0,0,0,0.1)",
};

export const borderRadius = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  full: "9999px",
};

export const ModalOverlay = styled.div<{ $isBlury?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: ${({ $isBlury }) => ($isBlury ? "blur(4px)" : "none")};
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
`;
