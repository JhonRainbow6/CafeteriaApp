import React, { useState } from "react";
import MenuList from "../components/MenuList";
import Cart from "../components/Cart";

function ClientePage() {
  const [cart, setCart] = useState([]);

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
      <MenuList onAddToCart={handleAddToCart} />
      <Cart cart={cart} onClear={handleClearCart} />
    </div>
  );
}

export default ClientePage;