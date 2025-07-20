import React, { useState, useEffect } from "react";

// Correlativas (idénticas a lo que ya tenías)
const correlativas = {
  9: { r: [1, 2] },
  10: { r: [1, 3] },
  12: { r: [4] },
  13: { r: [5, 6] },
  14: { r: [5, 6] },
  15: { r: [7] },
  16: { r: [6, 8] },
  17: { r: [1, 2] },
  18: { p: [1, 2] },
  19: { r: [13, 16], p: [5, 6] },
  20: { r: [14, 16], p: [5, 6] },
  21: { p: [3, 7] },
  22: { r: [9], p: [1, 2] },
  23: { r: [14, 16], p: [4, 6, 8] },
  24: { r: [11] },
  25: { r: [19, 20, 23], p: [13, 14] },
  26: { r: [15, 21] },
  27: { r: [17, 22] },
  28: { r: [17], p: [9] },
  29: { r: [10, 22], p: [9] },
  30: { r: [18, 23], p: [16] },
  31: { r: [28], p: [17, 22] },
  32: { r: [28], p: [17, 19] },
  33: { r: [18, 27], p: [23] },
  34: { r: [24, 30], p: [18] },
  35: { r: [26, 30], p: [20, 21] },
  36: { r: [25, 26, 30], p: [12, 20, 23] },
  37: { r: [25, 26, 30], p: [20, 23] }
};

// Materias
const materias = {
  "1° Año": [
    { id: 1, nombre: "Análisis Matemático I" },
    { id: 2, nombre: "Álgebra y Geometría Analítica" },
    { id: 3, nombre: "Física I" },
    { id: 4, nombre: "Inglés I" },
    { id: 5, nombre: "Lógica y Estructuras Discretas" },
    { id: 6, nombre: "Algoritmos y Estructura de Datos" },
    { id: 8, nombre: "Sistemas y Procesos de Negocios" }
  ],
  "2° Año": [
    { id: 9, nombre: "Análisis Matemático II" },
    { id: 7, nombre: "Arquitectura de Computadoras" },
    { id: 10, nombre: "Física II" },
    { id: 11, nombre: "Ingeniería y Sociedad" },
    { id: 12, nombre: "Inglés II" },
    { id: 13, nombre: "Sintaxis y Semántica de los Lenguajes" },
    { id: 14, nombre: "Paradigmas de Programación" },
    { id: 15, nombre: "Sistemas Operativos" },
    { id: 16, nombre: "Análisis de Sistemas de Información" }
  ],
  "3° Año": [
    { id: 17, nombre: "Probabilidad y Estadística" },
    { id: 18, nombre: "Economía" },
    { id: 19, nombre: "Bases de Datos" },
    { id: 20, nombre: "Desarrollo de Software" },
    { id: 21, nombre: "Comunicación de Datos" },
    { id: 22, nombre: "Análisis Numérico" },
    { id: 23, nombre: "Diseño de Sistemas de Información" }
  ],
  "4° Año": [
    { id: 24, nombre: "Legislación" },
    { id: 25, nombre: "Ingeniería y Calidad de Software" },
    { id: 26, nombre: "Redes de Datos" },
    { id: 27, nombre: "Investigación Operativa" },
    { id: 28, nombre: "Simulación" },
    { id: 29, nombre: "Tecnología para la Automatización" },
    { id: 30, nombre: "Administración de Sistemas de Información" }
  ],
  "5° Año": [
    { id: 31, nombre: "Inteligencia Artificial" },
    { id: 32, nombre: "Ciencia de Datos" },
    { id: 33, nombre: "Sistemas de Gestión" },
    { id: 34, nombre: "Gestión Gerencial" },
    { id: 35, nombre: "Seguridad en los Sistemas de Información" },
    { id: 36, nombre: "Proyecto Final" },
    { id: 37, nombre: "Práctica Profesional Supervisada" }
  ],
  Electivas: [
    { nombre: "2 horas" },
    { nombre: "2 horas" },
    { nombre: "2 horas" },
    { nombre: "2 horas" },
    { nombre: "2 horas" },
    { nombre: "2 horas" },
    { nombre: "2 horas" },
    { nombre: "2 horas" },
    { nombre: "2 horas" },
    { nombre: "2 horas" }
  ]
};

function App() {
  const [estados, setEstados] = useState(() => {
    const saved = localStorage.getItem("estadosMaterias");
    return saved ? JSON.parse(saved) : {};
  });

  const [menuAbierto, setMenuAbierto] = useState(false);

  const [mostrarColores, setMostrarColores] = useState(false);

  const coloresDefault = {
    "--color-fondo": "#000",
    "--color-titulo": "#6cf",
    "--color-letra": "#ffffff",
    "--color-bloque-pendiente": "#444",
    "--color-bloque-regularizada": "#3399ff",
    "--color-bloque-promocionada": "#003366",
    "--color-bloque-bloqueado": "#222",
    "--color-bloque-default": "#ccc"
  };

  const [colores, setColores] = useState(() => {
    const guardados = localStorage.getItem("coloresPersonalizados");
    return guardados ? JSON.parse(guardados) : coloresDefault;
  });

  // Aplica los colores al cargar y cuando cambian
  useEffect(() => {
    Object.entries(colores).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    localStorage.setItem("coloresPersonalizados", JSON.stringify(colores));
  }, [colores]);

  // ...antes del return, junto a tus otros handlers...
  const restaurarColores = () => {
    setColores(coloresDefault);
    localStorage.removeItem("coloresPersonalizados");
  };


  useEffect(() => {
    localStorage.setItem("estadosMaterias", JSON.stringify(estados));
  }, [estados]);

  const cambiarEstado = (id) => {
    if (!esHabilitada(id)) return;
    const maxEstado = id >= 1000 ? 2 : 3;
    setEstados((prev) => {
      const nuevoEstado = ((prev[id] || 0) + 1) % maxEstado;
      return { ...prev, [id]: nuevoEstado };
    });
  };

  const esHabilitada = (id) => {
    if (id >= 1000) return true;
    const reqs = correlativas[id];
    if (!reqs) return true;
    const reg = reqs.r || [];
    const prom = reqs.p || [];
    const rOk = reg.every((n) => (estados[n] || 0) >= 1);
    const pOk = prom.every((n) => (estados[n] || 0) === 2);
    return rOk && pOk;
  };

  const borrarTodo = () => {
    if (confirm("¿Estás segura de que querés borrar todo el progreso?")) {
      localStorage.removeItem("estadosMaterias");
      setEstados({});
    }
  };

  const exportarJSON = () => {
    const dataStr = JSON.stringify(estados, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "malla_backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importarJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const datos = JSON.parse(reader.result);
        setEstados(datos);
        alert("¡Backup cargado con éxito!");
      } catch (err) {
        alert("Error al cargar el archivo.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="menu-icon" onClick={() => setMenuAbierto(!menuAbierto)}>☰</div>
        <h1>Ingeniería en Sistemas UTN</h1>
      </header>

      {menuAbierto && (
        <div className="sidebar">
          <button onClick={borrarTodo}>🧹 Borrar progreso</button>
          <button onClick={exportarJSON}>💾 Descargar backup</button>
          <input type="file" accept=".json" onChange={importarJSON} />
          <button onClick={restaurarColores}>
            Restaurar colores originales
          </button>
          <button onClick={() => setMostrarColores(!mostrarColores)}>
            Personalizar colores
          </button>
          {mostrarColores && (
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <label>
                Fondo: <input type="color" value={colores["--color-fondo"]} onChange={e => setColores(c => ({ ...c, "--color-fondo": e.target.value }))} />
              </label>
              <label>
                Título: <input type="color" value={colores["--color-titulo"]} onChange={e => setColores(c => ({ ...c, "--color-titulo": e.target.value }))} />
              </label>
              <label>
                Letras: <input type="color" value={colores["--color-letra"]} onChange={e => setColores(c => ({ ...c, "--color-letra": e.target.value }))} />
              </label>
              <label>
                Pendiente: <input type="color" value={colores["--color-bloque-pendiente"]} onChange={e => setColores(c => ({ ...c, "--color-bloque-pendiente": e.target.value }))} />
              </label>
              <label>
                Regularizada: <input type="color" value={colores["--color-bloque-regularizada"]} onChange={e => setColores(c => ({ ...c, "--color-bloque-regularizada": e.target.value }))} />
              </label>
              <label>
                Promocionada: <input type="color" value={colores["--color-bloque-promocionada"]} onChange={e => setColores(c => ({ ...c, "--color-bloque-promocionada": e.target.value }))} />
              </label>
              <label>
                No habilitada: <input type="color" value={colores["--color-bloque-bloqueado"]} onChange={e => setColores(c => ({ ...c, "--color-bloque-bloqueado": e.target.value }))} />
              </label>
            </div>
          )}
        </div>
      )}

      <main className="grid">
        {Object.entries(materias).map(([anio, lista]) => {
          if (anio === "Electivas") {
            const sub1 = lista.slice(0, 5);
            const sub2 = lista.slice(5, 10);
            return (
              <div className="columna" key={anio}>
                <h2>{anio}</h2>
                <div className="subcolumnas">
                  <div className="subcolumna">
                    {sub1.map((materia, idx) => {
                      const id = 1000 + idx;
                      const estado = estados[id] || 0;
                      const claseEstado =
                        estado === 1
                          ? "promocionada"
                          : "pendiente";
                      return (
                        <div
                          className={`bloque electiva ${claseEstado}`}
                          key={id}
                          onClick={() => cambiarEstado(id)}
                        >
                          <span className="numero"></span>
                          <span className="nombre">{materia.nombre}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="subcolumna">
                    {sub2.map((materia, idx) => {
                      const id = 1005 + idx;
                      const estado = estados[id] || 0;
                      const claseEstado =
                        estado === 1
                          ? "promocionada"
                          : "pendiente";
                      return (
                        <div
                          className={`bloque electiva ${claseEstado}`}
                          key={id}
                          onClick={() => cambiarEstado(id)}
                        >
                          <span className="numero"></span>
                          <span className="nombre">{materia.nombre}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }
          // Renderizado normal para las demás columnas
          return (
            <div className="columna" key={anio}>
              <h2>{anio}</h2>
              {lista.map((materia) => {
                const estado = estados[materia.id] || 0;
                const claseEstado =
                  estado === 1
                    ? "regularizada"
                    : estado === 2
                    ? "promocionada"
                    : "pendiente";
                const bloqueada = !esHabilitada(materia.id);
                return (
                  <div
                    className={`bloque ${claseEstado} ${
                      bloqueada ? "bloque-bloqueado" : ""
                    }`}
                    key={materia.id}
                    onClick={() => cambiarEstado(materia.id)}
                  >
                    <span className="numero">{materia.id < 1000 ? materia.id : ""}</span>
                    <span className="nombre">{materia.nombre}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;


