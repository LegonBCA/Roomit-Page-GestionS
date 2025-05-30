import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardDocente from "./pages/DashboardDocente";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/dashboard-docente" element={<DashboardDocente />} />
      </Routes>
    </Router>
  );
}

export default App;


