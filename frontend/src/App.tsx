import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./components/AppRouter";
import HOCWrapper from "./components/HOCWrapper";
import Footer from "../src/components/Footer/Footer";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <HOCWrapper>
          <AppRouter />
        </HOCWrapper>
      </Router>
      <Footer />
    </>
  );
};

export default App;
