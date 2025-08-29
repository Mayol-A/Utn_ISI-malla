import React, { useState } from "react";
import "./ProgressBar.css";

export default function ProgressBar({ materiasPromocionadas, materiasRegulares, horasElectivas }) {
  const TOTAL_OBLIGATORIAS = 37;
  const TOTAL_ELECTIVAS = 20;
  const TOTAL_UNIDADES = TOTAL_OBLIGATORIAS + TOTAL_ELECTIVAS;

  // Cálculos
  const unidadesObligatorias =
    materiasPromocionadas + materiasRegulares * 0.5;
  const unidadesElectivas = horasElectivas;

  const progresoTotal = ((unidadesObligatorias + unidadesElectivas) / TOTAL_UNIDADES) * 100;
  const progresoMaterias = (unidadesObligatorias / TOTAL_OBLIGATORIAS) * 100;
  const progresoElectivas = (unidadesElectivas / TOTAL_ELECTIVAS) * 100;

  const [mostrarMas, setMostrarMas] = useState(false);

  return (
    <div className="progress-container">
      {/* Barra principal */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progresoTotal}%` }}
        ></div>
        <span className="progress-text">{Math.round(progresoTotal)}%</span>
      </div>

      {/* Botón Más */}
      <button className="btn-mas" onClick={() => setMostrarMas(true)}>
        Más
      </button>

      {/* Mini barras y modal */}
      {mostrarMas && (
        <>
          <div className="mini-section">
            <h4>Materias</h4>
            <div className="progress-bar mini">
              <div
                className="progress-fill"
                style={{ width: `${progresoMaterias}%` }}
              ></div>
              <span className="progress-text">{Math.round(progresoMaterias)}%</span>
            </div>
          </div>

          <div className="mini-section">
            <h4>Electivas</h4>
            <div className="progress-bar mini">
              <div
                className="progress-fill"
                style={{ width: `${progresoElectivas}%` }}
              ></div>
              <span className="progress-text">{Math.round(progresoElectivas)}%</span>
            </div>
          </div>

          {/* Modal */}
          <div className="modal-backdrop" onClick={() => setMostrarMas(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>🌎 Seguimiento de Mi Progreso</h3>
              <p>-📚 Obligatorias</p>
              <ul>
                <li>Promocionadas: {materiasPromocionadas}</li>
                <li>Regulares: {materiasRegulares}</li>
                <li>Pendientes: {TOTAL_OBLIGATORIAS - materiasPromocionadas - materiasRegulares}</li>
              </ul>

              <p>-🔬 Electivas</p>
              <ul>
                <li>Horas cumplidas: {horasElectivas}</li>
                <li>Horas restantes: {TOTAL_ELECTIVAS - horasElectivas}</li>
              </ul>

              <button className="btn-cerrar" onClick={() => setMostrarMas(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

