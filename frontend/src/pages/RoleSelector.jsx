import React from "react";
import { useNavigate } from "react-router-dom";

function RoleSelector() {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    navigate("/login", { state: { role } });
  };

  return (
    <div className="h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-50">
      <div className="text-center md:w-1/2 p-8">
        <h1 className="text-5xl font-extrabold text-amber-800 mb-4">
          ☕ CafeteríaApp
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Bienvenido al sistema de gestión de pedidos y menú.
        </p>
        <p className="text-gray-600">
          Selecciona tu rol para continuar:
        </p>
      </div>

      <div className="flex flex-col space-y-6 md:w-1/3 w-3/4 bg-white p-10 rounded-2xl shadow-lg border border-amber-100">
        <button
          onClick={() => handleSelect("cliente")}
          className="bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg text-lg font-semibold shadow transition"
        >
          👩‍🎓 Entrar como Cliente
        </button>
        <button
          onClick={() => handleSelect("barista")}
          className="bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg text-lg font-semibold shadow transition"
        >
          👨‍🍳 Entrar como Barista
        </button>
      </div>
    </div>
  );
}

export default RoleSelector;