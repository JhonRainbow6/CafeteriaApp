import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import toast from "react-hot-toast";

function MenuList({ onAddToCart }) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar menú desde el backend
  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/menu");
      setMenu(response.data);
    } catch (error) {
      console.error("Error al cargar el menú:", error);
      toast.error("No se pudo obtener el menú del servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  if (loading) return <Loader />;

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
              <p className="text-gray-600 mb-3">${cafe.precio.toFixed(2)}</p>
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