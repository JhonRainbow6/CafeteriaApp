import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("authToken");
    navigate("/role");
  };

  return (
    <nav className="bg-amber-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">☕ CafeteríaApp</h1>

      <div className="flex items-center space-x-6">
        {/* Mostrar información del usuario si está logueado */}
        {userRole && userEmail && (
          <div className="text-sm">
            <span className="text-yellow-200">
              {userEmail} ({userRole})
            </span>
          </div>
        )}

        {/* Enlaces según el rol */}
        {userRole === "CLIENTE" && (
          <Link
            to="/cliente"
            className={`hover:text-yellow-300 transition ${
              location.pathname === "/cliente"
                ? "text-yellow-400 font-semibold"
                : ""
            }`}
          >
            Menú
          </Link>
        )}

        {userRole === "BARISTA" && (
          <Link
            to="/barista"
            className={`hover:text-yellow-300 transition ${
              location.pathname === "/barista"
                ? "text-yellow-400 font-semibold"
                : ""
            }`}
          >
            Órdenes
          </Link>
        )}

        {/* Botón de logout si hay usuario */}
        {userRole && (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition"
          >
            Salir
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;