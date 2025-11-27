import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state?.role || "desconocido";

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const submit = () => {
    if (email === "" || pass === "") {
      toast.error("Completa todos los campos");
      return;
    }

    if (email === "admin@cafe.com" && pass === "1234") {
      localStorage.setItem("userRole", role);
      toast.success("Bienvenido!");

      if (role === "cliente") navigate("/cliente");
      else navigate("/barista");

    } else {
      toast.error("Credenciales incorrectas");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96 border border-amber-100">
        
        <h2 className="text-center text-2xl font-bold text-amber-800 mb-6">
          Iniciar sesión como {role}
        </h2>

        <input
          type="email"
          placeholder="Correo"
          className="w-full p-3 mb-4 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-3 mb-6 border rounded-lg"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg text-lg font-semibold shadow transition"
        >
          Entrar
        </button>

        <button
          onClick={() => navigate("/role")}
          className="w-full mt-4 underline text-amber-700"
        >
          Cambiar rol
        </button>
      </div>
    </div>
  );
}

export default LoginPage;