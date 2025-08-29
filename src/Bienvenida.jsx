import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import SelectorCarrera from "./SelectorCarrera";

export default function Bienvenida({ onSeleccionarCarrera }) {
  const [carrera, setCarrera] = useState("");

  const manejarConfirmar = async () => {
    if (!carrera) return alert("Por favor seleccioná una carrera");

    const userId = await getOrCreateUserId();
    // Guardar en Supabase
    const { error } = await supabase
      .from("usuarios")
      .update({ carrera })
      .eq("id", userId);

    if (error) {
      console.error("Error guardando carrera:", error);
    } else {
      // Guardar también en localStorage
      localStorage.setItem("carrera", carrera);

      // Avisar a App.js que ya está elegida
      onSeleccionarCarrera(carrera);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Bienvenido/a</h1>
      <p className="text-gray-600">Seleccioná tu carrera para continuar:</p>

      <SelectorCarrera onChange={setCarrera} />

      <button
        onClick={manejarConfirmar}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
      >
        Confirmar
      </button>
    </div>
  );
}

