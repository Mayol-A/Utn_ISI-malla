import React, { useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";
import { materias, correlativas } from "./utils";
import ProgressBar from './components/ProgressBar';
import './components/ProgressBar.css'; // asegura que los estilos del modal/barra estén cargados
import Bienvenida from "./Bienvenida";

function App() {
  const [userId] = useState(() => {
    let uid = localStorage.getItem("user_id");
    if (!uid) {
      uid = crypto.randomUUID();
      localStorage.setItem("user_id", uid);
    }
    return uid;
  }); 

  const [estados, setEstados] = useState(() => {
    const saved = localStorage.getItem("estadosMaterias");
    return saved ? JSON.parse(saved) : {};
  });

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDesdeSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from("progreso_malla")
          .select("datos")
          .eq("user_id", userId)
          .single();
        if (!error && data && data.datos) {
          setEstados(data.datos);
        }
      } catch (e) {
        console.error("Error cargando desde supabase:", e);
      } finally {
        setCargando(false); // Marca que terminó de cargar
      }
    };
    cargarDesdeSupabase();
  }, [userId]);

  useEffect(() => {
    if (!cargando) {
      const guardarEnSupabase = async () => {
        const { error } = await supabase
          .from("progreso_malla")
          .upsert({ user_id: userId, datos: estados });
        if (error) console.error(":( Error al guardar en Supabase:", error);
      };
      guardarEnSupabase();
    }
  }, [estados, userId, cargando]);

  const [menuAbierto, setMenuAbierto] = useState(false);
  // Ref al sidebar para manipular scroll interno
  const sidebarRef = useRef(null);

  // Abre el menú y lo deja en su "forma original"
  function openMenu() {
    // cerrar secciones internas para que quede "limpio" (original)
    setMostrarColores(false);
    setShowProgress(false);
    setMenuAbierto(true);

    setTimeout(() => {
      const content = sidebarRef.current?.querySelector('.sidebar__content');
      if (content) content.scrollTop = 0;
    }, 360);
  }

  // Cierra el menú y resetea también
  function closeMenu() {
    setMenuAbierto(false);
    setMostrarColores(false);
    setShowProgress(false);

    // resetea scroll inmediatamente (no depende de animación)
    const content = sidebarRef.current?.querySelector('.sidebar__content');
    if (content) content.scrollTop = 0;
  }

  function closeMenuKeepProgress() {
    setMenuAbierto(false);
    setMostrarColores(false);

    const content = sidebarRef.current?.querySelector('.sidebar__content');
    if (content) content.scrollTop = 0;
  }


  // Cerrar con tecla ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuAbierto(false);
    };
    if (menuAbierto) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuAbierto]);

  const [showProgress, setShowProgress] = useState(false);
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

  const restaurarColores = () => {
    setColores(coloresDefault);
    localStorage.removeItem("coloresPersonalizados");
  };

  useEffect(() => {
    localStorage.setItem("estadosMaterias", JSON.stringify(estados));
  }, [estados]);

  // --- Cálculos automáticos para Progreso ---
  const TOTAL_OBLIGATORIAS = 37;
  const TOTAL_ELECTIVAS_HORAS = 20;
  const TOTAL_UNIDADES = TOTAL_OBLIGATORIAS + TOTAL_ELECTIVAS_HORAS; // 57

  const materiasObligatoriasList = Object.entries(materias)
    .filter(([key]) => key !== "Electivas")
    .flatMap(([, lista]) => lista);

  // Contar promocionadas (estado === 2) y regularizadas (estado === 1) para id < 1000
  const materiasPromocionadas = materiasObligatoriasList.filter(m => {
    const st = Number(estados[m.id] || 0);
    return st === 2;
  }).length;

  const materiasRegularizadas = materiasObligatoriasList.filter(m => {
    const st = Number(estados[m.id] || 0);
    return st === 1;
  }).length;

  // Contar electivas aprobadas a partir de la lista de Electivas (ids 1000..1000+N-1)
  const electivasList = materias["Electivas"] || [];
  const electivasAprobadasCount = electivasList.reduce((acc, _, idx) => {
    const id = 1000 + idx; // mapeo: primer bloque = 1000, siguiente 1001, ... hasta 1009
    const st = Number(estados[id] || 0);
    return acc + (st === 1 ? 1 : 0); // electiva promocionada = 1
  }, 0);

  const horasElectivas = electivasAprobadasCount * 2; // 2 horas por bloque

  // Unidades obtenidas y porcentaje
  const unidadesObtenidas = materiasPromocionadas + (materiasRegularizadas * 0.5) + horasElectivas;
  let porcentajeProgreso = Math.round((unidadesObtenidas / TOTAL_UNIDADES) * 100);
  if (!isFinite(porcentajeProgreso)) porcentajeProgreso = 0;
  if (porcentajeProgreso < 0) porcentajeProgreso = 0;
  if (porcentajeProgreso > 100) porcentajeProgreso = 100;

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
        <div className="menu-icon" 
        onClick={() => (menuAbierto ? closeMenu() : openMenu ())}
        aria-expanded={menuAbierto}
        aria-controls="sidebar"
      >
        ☰
      </div>
        <h1>Ingeniería en Sistemas UTN</h1>
      </header>

      {menuAbierto && (
        <div className="sidebar__overlay" onClick={closeMenu} />
      )}  
      
      {/* Drawer lateral */}
      <aside 
        id="sidebar"
        ref={sidebarRef}
        className={`sidebar-container ${menuAbierto ? "open" : ""}`} 
        aria-hidden={!menuAbierto}
      >
        <div className="sidebar__header">
          <span className="sidebar__title">Menú</span>
          <button className="sidebar__close" onClick={closeMenu} aria-label="Cerrar">
            ✕
          </button>
        </div>

        <div className="sidebar__content">
          <button onClick={() => { setShowProgress(true); closeMenuKeepProgress(); }}>
            Mi Progreso
          </button>

          <button onClick={() => { borrarTodo(); closeMenu(); }}>
            Borrar materias
          </button>

          <button onClick={exportarJSON}>Descargar backup</button>
          <input type="file" accept=".json" onChange={importarJSON} />
          
          <button onClick={() => setMostrarColores(v => !v)}>
            Personalizar colores
          </button>
          
          {mostrarColores && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label>Fondo: <input type="color" value={colores["--color-fondo"]} onChange={e => setColores(c => ({ ...c, "--color-fondo": e.target.value }))} /></label>
              <label>Título: <input type="color" value={colores["--color-titulo"]} onChange={e => setColores(c => ({ ...c, "--color-titulo": e.target.value }))} /></label>
              <label>Letras: <input type="color" value={colores["--color-letra"]} onChange={e => setColores(c => ({ ...c, "--color-letra": e.target.value }))} /></label>
              <label>Pendiente: <input type="color" value={colores["--color-bloque-pendiente"]} onChange={e => setColores(c => ({ ...c, "--color-bloque-pendiente": e.target.value }))} /></label>
              <label>Regularizada: <input type="color" value={colores["--color-bloque-regularizada"]} onChange={e => setColores(c => ({ ...c, "--color-bloque-regularizada": e.target.value }))} /></label>
              <label>Promocionada: <input type="color" value={colores["--color-bloque-promocionada"]} onChange={e => setColores(c => ({ ...c, "--color-bloque-promocionada": e.target.value }))} /></label>
              <label>No habilitada: <input type="color" value={colores["--color-bloque-bloqueado"]} onChange={e => setColores(c => ({ ...c, "--color-bloque-bloqueado": e.target.value }))} /></label>
            </div>
          )}

          <button onClick={restaurarColores}>Restaurar colores originales</button>
        </div>
      </aside>

      {/* Modal de Progreso (está fuera del main para cubrir toda la página) */}
      {showProgress && (
        <div className="modal-backdrop" onClick={() => setShowProgress(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Mi Progreso</h2>

            <ProgressBar
              materiasPromocionadas={materiasPromocionadas}
              materiasRegulares={materiasRegularizadas}
              horasElectivas={horasElectivas}
            />

            <div style={{ marginTop: 12 }}>
              <button onClick={() => setShowProgress(false)} className="btn-cerrar">Cerrar</button>
            </div>
          </div>
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


