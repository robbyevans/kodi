// /web/src/App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./Router/AppRouter";
import HOCWrapper from "./components/HOCWrapper";
import OfflinePage from "./components/OfflinePage/OfflinePage";

const App: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    updateOnlineStatus(); // check on first load
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  if (!isOnline) return <OfflinePage />;

  return (
    <Router>
      <HOCWrapper>
        <AppRouter />
      </HOCWrapper>
    </Router>
  );
};

export default App;
