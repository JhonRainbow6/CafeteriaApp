import React from "react";
import OrdersList from "../components/OrdersList";

function BaristaPage() {
  React.useEffect(() => {
    console.log("BaristaPage renderizada correctamente");
  }, []);

  return(
    <div>
      <h2 className="text-3xl font-bold text-amber-900 mb-6">Órdenes Pendientes</h2>
      <OrdersList />
    </div>
  );
}

export default BaristaPage;