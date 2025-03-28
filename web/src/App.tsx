import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./Router/AppRouter";
import HOCWrapper from "./components/HOCWrapper";

const App: React.FC = () => {
  return (
    <Router>
      <HOCWrapper>
        <AppRouter />
      </HOCWrapper>
    </Router>
  );
};

export default App;
