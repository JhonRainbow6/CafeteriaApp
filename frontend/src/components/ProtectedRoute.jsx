import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const userRole = localStorage.getItem("userRole");

  // No ha iniciado sesión
  if (!userRole) {
    return <Navigate to="/login" />;
  }

  // Si el rol NO coincide, bloquear
  if (role && userRole !== role) {
    return <Navigate to="/role" />;
  }

  return children;
}

export default ProtectedRoute;