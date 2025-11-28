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
      toast.success(`Estado cambiado a "${nuevoEstado}" ✅`);
      fetchOrders();
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      toast.error("Error al actualizar estado ❌");
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
          className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="font-bold text-lg text-amber-800 mb-2">Orden #{order.id}</h3>
          <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
          <p>
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
          <p className="text-gray-500 text-sm mb-4">
            {new Date(order.fechaCreacion).toLocaleString()}
          </p>
          <div className="space-x-2">
            <button
              onClick={() => cambiarEstado(order.id, "EN PREPARACIÓN")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              En preparación
            </button>
            <button
              onClick={() => cambiarEstado(order.id, "LISTO")}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
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