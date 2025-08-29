import React from "react";
import { carreras } from "./data/carreras";

export default function SelectorCarrera({ onChange }) {
  return (
    <select
      className="border rounded-lg p-2"
      defaultValue=""
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        -- Seleccioná una carrera --
      </option>
      {Object.entries(carreras).map(([id, carrera]) => (
        <option key={id} value={id}>
          {carrera.nombre}
        </option>
      ))}
    </select>
  );
}

