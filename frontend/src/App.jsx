import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import ClientePage from "./pages/ClientePage";
import BaristaPage from "./pages/BaristaPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100">
        <Routes>
          {/* 🔸 Pantalla inicial */}
          <Route path="/" element={<LoginPage />} />

          {/* 🔸 Módulo cliente */}
          <Route
            path="/cliente"
            element={
              <>
                <Navbar />
                <div className="p-6 max-w-6xl mx-auto">
                  <ClientePage />
                </div>
              </>
            }
          />

          {/* 🔸 Módulo barista */}
          <Route
            path="/barista"
            element={
              <>
                <Navbar />
                <div className="p-6 max-w-6xl mx-auto">
                  <BaristaPage />
                </div>
              </>
            }
          />
        </Routes>

        {/* Toasts globales */}
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </Router>
  );
}

export default App;