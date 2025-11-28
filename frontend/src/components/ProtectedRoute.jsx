import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const userRole = localStorage.getItem("userRole");
  const authToken = localStorage.getItem("authToken");

  console.log("ProtectedRoute check:", {
    userRole,
    requiredRole: role,
    hasToken: !!authToken,
    url: window.location.pathname
  });

  // No ha iniciado sesión (sin rol o sin token)
  if (!userRole || !authToken) {
    console.log("Sin autenticación, redirigiendo a /role");
    return <Navigate to="/role" replace />;
  }

  // Si el rol NO coincide, bloquear (comparación case-insensitive)
  if (role && userRole.toLowerCase() !== role.toLowerCase()) {
    console.log(`Rol incorrecto: tiene '${userRole}', necesita '${role}'`);
    return <Navigate to="/role" replace />;
  }

  console.log("Acceso permitido para", userRole);
  return children;
}

export default ProtectedRoute;