// LoginPage.jsx (reemplaza el contenido existente)
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../services/api";
import toast from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "desconocido";

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (email === "" || pass === "") {
      toast.error("Completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post("/auth/login", {
        email: email,
        password: pass
      });

      const { email: userEmail, rol, token } = response.data;

      // Verificar rol
      if (rol.toLowerCase() !== role.toLowerCase()) {
        toast.error(`Este usuario no tiene permisos de ${role}`);
        setLoading(false);
        return;
      }

      // Guardar en localStorage
      localStorage.setItem("userRole", rol);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("authToken", token);

      // Verificar que se guardó correctamente
      const savedRole = localStorage.getItem("userRole");
      console.log("Login exitoso:", {
        rol,
        role,
        userEmail,
        savedRole,
        localStorage: {
          userRole: localStorage.getItem("userRole"),
          userEmail: localStorage.getItem("userEmail"),
          authToken: localStorage.getItem("authToken")
        }
      });

      toast.success("¡Bienvenido!");

      // Navegación inmediata con replace para evitar problemas de historial
      if (role.toLowerCase() === "cliente") {
        console.log("Navegando a /cliente");
        navigate("/cliente", { replace: true });
      } else if (role.toLowerCase() === "barista") {
        console.log("Navegando a /barista");
        navigate("/barista", { replace: true });
      }

    } catch (error) {
      console.error("Error en login:", error);
      if (error.response?.status === 401) {
        toast.error("Credenciales incorrectas");
      } else {
        toast.error("Error de conexión con el servidor");
      }
      setLoading(false);
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
              disabled={loading}
          />

          <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-3 mb-6 border rounded-lg"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              disabled={loading}
          />

          <button
              onClick={submit}
              disabled={loading}
              className="w-full bg-amber-700 hover:bg-amber-800 disabled:bg-gray-400 text-white py-3 rounded-lg text-lg font-semibold shadow transition"
          >
            {loading ? "Iniciando..." : "Entrar"}
          </button>

          <button
              onClick={() => navigate("/role")}
              className="w-full mt-4 underline text-amber-700"
              disabled={loading}
          >
            Cambiar rol
          </button>
        </div>
      </div>
  );
}

export default LoginPage;
