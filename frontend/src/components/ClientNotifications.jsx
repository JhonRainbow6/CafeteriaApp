import React, { useEffect, useState } from "react";
import apiClient from "../services/api";
import toast from "react-hot-toast";
import Loader from "./Loader";

function ClientNotifications({ userEmail }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchUserOrders = async () => {
    if (!userEmail) {
      setLoading(false);
      return;
    }

    try {
      console.log("Cargando órdenes del usuario:", userEmail);
      const response = await apiClient.get(`/orders/user/${userEmail}`);
      console.log("Órdenes del usuario cargadas:", response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error al obtener órdenes del usuario:", error);
      if (error.response?.status === 404) {
        // Usuario sin órdenes, no es un error
        setOrders([]);
      } else if (error.code === 'ERR_NETWORK') {
        toast.error("Error de conexión con el servidor.");
      } else {
        toast.error("No se pudieron cargar tus pedidos.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
    // Actualizar cada 10 segundos
    const interval = setInterval(fetchUserOrders, 10000);
    return () => clearInterval(interval);
  }, [userEmail]);

  // Contar órdenes pendientes o en preparación
  const pendingCount = orders.filter(
    (order) => order.estado === "PENDIENTE" || order.estado === "EN PREPARACIÓN"
  ).length;

  if (loading) return <Loader />;

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-amber-800 flex items-center gap-2">
            🔔 Mis Notificaciones
            {pendingCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {pendingCount}
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Estado de tus pedidos en tiempo real
          </p>
        </div>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition"
        >
          {showNotifications ? "Ocultar" : "Ver Pedidos"}
        </button>
      </div>

      {showNotifications && (
        <div className="mt-4">
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No tienes pedidos realizados aún.
            </p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    order.estado === "PENDIENTE"
                      ? "bg-yellow-50 border-yellow-500"
                      : order.estado === "EN PREPARACIÓN"
                      ? "bg-blue-50 border-blue-500"
                      : "bg-green-50 border-green-500"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg">
                      Pedido #{order.id}
                    </h4>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.estado === "PENDIENTE"
                          ? "bg-yellow-500 text-white"
                          : order.estado === "EN PREPARACIÓN"
                          ? "bg-blue-500 text-white"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {order.estado}
                    </span>
                  </div>

                  {/* Items del pedido */}
                  {order.items && order.items.length > 0 && (
                    <div className="mb-3 space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">
                            {item.cantidad}x {item.cafeNombre}
                          </span>
                          {item.ingredientes && (
                            <p className="text-xs text-gray-600 italic ml-4">
                              🔸 {item.ingredientes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      {new Date(order.fechaCreacion).toLocaleString()}
                    </span>
                    <span className="font-bold text-amber-700">
                      Total: ${order.total.toFixed(2)}
                    </span>
                  </div>

                  {/* Mensaje según el estado */}
                  {order.estado === "PENDIENTE" && (
                    <p className="text-sm text-yellow-700 mt-2 italic">
                      ⏳ Tu pedido está en cola, pronto comenzará su preparación.
                    </p>
                  )}
                  {order.estado === "EN PREPARACIÓN" && (
                    <p className="text-sm text-blue-700 mt-2 italic">
                      ¡Tu pedido está siendo preparado! No tardaremos mucho.
                    </p>
                  )}
                  {order.estado === "LISTO" && (
                    <p className="text-sm text-green-700 mt-2 italic font-semibold">
                      ¡Tu pedido está listo! Puedes recogerlo en el mostrador.
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ClientNotifications;

