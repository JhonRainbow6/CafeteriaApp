import React, { useEffect, useState } from "react";
import apiClient from "../services/api";
import Loader from "./Loader";
import toast from "react-hot-toast";

function MenuList({ onAddToCart }) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar menú desde el backend
  const fetchMenu = async () => {
    try {
      console.log("Intentando cargar el menú...");
      const response = await apiClient.get("/menu");
      console.log("Menú cargado exitosamente:", response.data);
      setMenu(response.data);
    } catch (error) {
      console.error("Error al cargar el menú:", error);
      if (error.response?.status === 404) {
        toast.error("Endpoint del menú no encontrado. Verifica que el backend esté ejecutándose.");
      } else if (error.code === 'ERR_NETWORK') {
        toast.error("No se pudo conectar al servidor. Verifica que el backend esté ejecutándose en el puerto 8080.");
      } else {
        toast.error("No se pudo obtener el menú del servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("MenuList montado, iniciando carga del menú");
    fetchMenu();
  }, []);

  useEffect(() => {
    console.log("Estado del menú actualizado:", { menu, loading, count: menu.length });
  }, [menu, loading]);

  if (loading) {
    console.log("MenuList mostrando loader...");
    return <Loader />;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-amber-800 text-center mb-6">
        ☕ Menú de Cafés
      </h2>
      {menu.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay cafés registrados en el sistema.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.map((cafe) => (
            <div
              key={cafe.id}
              className="bg-white shadow-md rounded-xl p-6 border border-amber-200 hover:shadow-lg transition"
            >
              <img
                src={`https://source.unsplash.com/300x200/?coffee,${cafe.nombre}`}
                alt={cafe.nombre}
                className="rounded-lg mb-4 w-full h-40 object-cover"
              />
              <h3 className="text-xl font-semibold text-amber-800">
                {cafe.nombre}
              </h3>
              <p className="text-gray-600 mb-2">${cafe.precio.toFixed(2)}</p>
              {cafe.ingredientes && (
                <p className="text-sm text-gray-500 italic mb-3">
                  {cafe.ingredientes}
                </p>
              )}
              <button
                onClick={() => onAddToCart(cafe)}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-lg font-semibold transition"
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuList;