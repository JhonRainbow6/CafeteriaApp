import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    axios
      .get("http://localhost:8080/api/orders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener órdenes:", err);
        setLoading(false);
      });
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await axios.put(`http://localhost:8080/api/orders/${id}/state`, nuevoEstado, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(`Estado cambiado a "${nuevoEstado}"`);
      fetchOrders();
    } catch (err) {
      toast.error("Error al actualizar estado ❌");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  return (
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
  );
}

export default OrdersList;