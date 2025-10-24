import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-amber-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">☕ CafeteríaApp</h1>
      <div className="space-x-6">
        <Link
          to="/cliente"
          className={`hover:text-yellow-300 transition ${
            location.pathname === "/cliente" ? "text-yellow-400 font-semibold" : ""
          }`}
        >
          Cliente
        </Link>
        <Link
          to="/barista"
          className={`hover:text-yellow-300 transition ${
            location.pathname === "/barista" ? "text-yellow-400 font-semibold" : ""
          }`}
        >
          Barista
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;