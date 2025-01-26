import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux"; // Import the Provider
import store from "./redux/store.ts"; // Import your Redux store

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {" "}
      {/* Wrap the App component with the Provider */}
      <App />
    </Provider>
  </StrictMode>
);
