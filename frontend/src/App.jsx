import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import ClientePage from "./pages/ClientePage";
import BaristaPage from "./pages/BaristaPage";
import RoleSelector from "./pages/RoleSelector";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* 🔸 Redirección inicial a selección de rol */}
        <Route path="/" element={<Navigate to="/role" />} />

        {/* 🔸 Selección de rol */}
        <Route path="/role" element={<RoleSelector />} />

        {/* 🔸 Login dependiendo del rol */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🔸 Módulo Cliente (protegido solo para cliente) */}
        <Route
          path="/cliente"
          element={
            <ProtectedRoute role="cliente">
              <>
                <Navbar />
                <div className="p-6 max-w-6xl mx-auto">
                  <ClientePage />
                </div>
              </>
            </ProtectedRoute>
          }
        />

        {/* 🔸 Módulo Barista (protegido solo para barista) */}
        <Route
          path="/barista"
          element={
            <ProtectedRoute role="barista">
              <>
                <Navbar />
                <div className="p-6 max-w-6xl mx-auto">
                  <BaristaPage />
                </div>
              </>
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* Toasts globales */}
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;