import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-full py-8">
      <div className="w-10 h-10 border-4 border-amber-700 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-3 text-amber-800 font-semibold">Cargando...</span>
    </div>
  );
}

export default Loader;