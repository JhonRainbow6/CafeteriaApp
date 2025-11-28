import React, { useState } from "react";
import MenuList from "../components/MenuList";
import Cart from "../components/Cart";

function ClientePage() {
  const [cart, setCart] = useState([]);
  const [backendStatus, setBackendStatus] = useState("checking");

  React.useEffect(() => {
    console.log("ClientePage renderizada correctamente");

    // Probar conexión con el backend
    const testBackend = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/menu");
        if (response.ok) {
          const data = await response.json();
          console.log("Backend conectado, datos del menú:", data);
          setBackendStatus("connected");
        } else {
          console.error("Backend responde pero con error:", response.status);
          setBackendStatus("error");
        }
      } catch (error) {
        console.error("Error conectando al backend:", error);
        setBackendStatus("disconnected");
      }
    };

    testBackend();
  }, []);

  const handleAddToCart = (cafe) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cafe.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === cafe.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...cafe, cantidad: 1 }];
      }
    });
  };

  const handleClearCart = () => setCart([]);

  return (
    <div className="space-y-10">
      {/* Indicador temporal del estado del backend */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Estado del Backend:</h3>
        {backendStatus === "checking" && (
          <p className="text-blue-600">🔄 Verificando conexión...</p>
        )}
        {backendStatus === "connected" && (
          <p className="text-green-600">✅ Backend conectado correctamente</p>
        )}
        {backendStatus === "error" && (
          <p className="text-orange-600">⚠️ Backend responde con errores</p>
        )}
        {backendStatus === "disconnected" && (
          <p className="text-red-600">❌ No se puede conectar al backend. ¿Está ejecutándose en el puerto 8080?</p>
        )}
      </div>

      <MenuList onAddToCart={handleAddToCart} />
      <Cart cart={cart} onClear={handleClearCart} />
    </div>
  );
}

export default ClientePage;