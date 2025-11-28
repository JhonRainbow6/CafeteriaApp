import React, { useEffect, useState } from "react";
import apiClient from "../services/api";
import toast from "react-hot-toast";
import Loader from "./Loader";

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      console.log("Cargando órdenes...");
      const response = await apiClient.get("/orders");
      console.log("Órdenes cargadas:", response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      if (error.response?.status === 404) {
        toast.error("Servicio de órdenes no encontrado.");
      } else if (error.code === 'ERR_NETWORK') {
        toast.error("Error de conexión con el servidor.");
      } else {
        toast.error("No se pudieron cargar las órdenes.");
      }
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      console.log(`Cambiando estado de orden ${id} a ${nuevoEstado}`);
      await apiClient.put(`/orders/${id}/state`, nuevoEstado, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(`Estado cambiado a "${nuevoEstado}"`);
      fetchOrders();
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      toast.error("Error al actualizar estado");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      {/* Indicador de estado */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-blue-800">
          📊 <strong>Total de órdenes:</strong> {orders.length}
          {orders.length === 0 && " - No hay órdenes pendientes"}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition border-l-4 border-amber-500"
        >
          <h3 className="font-bold text-lg text-amber-800 mb-3">☕ Orden #{order.id}</h3>

          {/* Listado de items de la orden */}
          {order.items && order.items.length > 0 && (
            <div className="mb-4 border-t border-b border-gray-200 py-3">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Items del pedido:</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="bg-amber-50 p-2 rounded text-sm">
                    <div className="flex justify-between font-medium">
                      <span>{item.cantidad}x {item.cafeNombre}</span>
                      <span className="text-amber-700">${item.subtotal.toFixed(2)}</span>
                    </div>
                    {item.ingredientes && (
                      <p className="text-xs text-gray-600 italic mt-1">
                        🔸 {item.ingredientes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4 space-y-2">
            <p className="flex justify-between">
              <strong>Total:</strong>
              <span className="text-amber-700 font-semibold">${order.total.toFixed(2)}</span>
            </p>
            <p className="flex items-center gap-2">
              <strong>Estado:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-white text-sm ${
                  order.estado === "PENDIENTE"
                    ? "bg-yellow-500"
                    : order.estado === "EN PREPARACIÓN"
                    ? "bg-blue-500"
                    : "bg-green-600"
                }`}
              >
                {order.estado}
              </span>
            </p>
            <p className="text-gray-500 text-sm">
              {new Date(order.fechaCreacion).toLocaleString()}
            </p>
          </div>

          <div className="space-x-2 flex gap-2">
            <button
              onClick={() => cambiarEstado(order.id, "EN PREPARACIÓN")}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition text-sm"
              disabled={order.estado === "LISTO"}
            >
              En preparación
            </button>
            <button
              onClick={() => cambiarEstado(order.id, "LISTO")}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition text-sm"
              disabled={order.estado === "LISTO"}
            >
               Listo
            </button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default OrdersList;