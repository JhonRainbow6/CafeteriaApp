import React from "react";
import apiClient from "../services/api";
import toast from "react-hot-toast";

function Cart({ cart, onClear }) {
  const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const handleSubmitOrder = async () => {
    if (cart.length === 0) {
      toast.error("El carrito está vacío.");
      return;
    }

    const orderItems = cart.map((item) => ({
      cafeId: item.id,
      cantidad: item.cantidad,
    }));

    console.log("Enviando pedido:", orderItems);
    console.log("Items del carrito:", cart);

    try {
      const response = await apiClient.post("/orders", orderItems);
      console.log("Pedido creado exitosamente:", response.data);
      toast.success(`¡Pedido #${response.data.id} creado con éxito! 🎉`);
      onClear(); // vaciar carrito
    } catch (error) {
      console.error("Error detallado al enviar pedido:", {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data,
        orderItems
      });

      if (error.response?.status === 400) {
        toast.error(`Error en el pedido: ${error.response.data}`);
      } else if (error.response?.status === 404) {
        toast.error("Servicio de pedidos no encontrado. Verifica que el backend esté ejecutándose.");
      } else if (error.code === 'ERR_NETWORK') {
        toast.error("Error de conexión. Verifica que el backend esté ejecutándose.");
      } else {
        toast.error("No se pudo crear el pedido. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-amber-100 mt-8">
      <h3 className="text-2xl font-semibold text-amber-800 mb-4">🛒 Tu Carrito</h3>
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Aún no hay cafés seleccionados.</p>
      ) : (
        <>
          <ul className="divide-y divide-amber-100">
            {cart.map((item) => (
              <li key={item.id} className="py-2 flex justify-between items-center">
                <span>
                  {item.nombre} × {item.cantidad}
                </span>
                <span className="text-amber-700 font-semibold">
                  ${(item.precio * item.cantidad).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">
              Total: ${total.toFixed(2)}
            </span>
            <button
              onClick={handleSubmitOrder}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              Enviar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;