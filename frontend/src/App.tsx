import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import AppRouter from "./components/AppRouter";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <div style={{ padding: "1rem", marginBottom: "4rem" }}>
          <AppRouter />
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
