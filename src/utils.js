import { supabase } from './supabaseClient';
export function getOrCreateUserId() {
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('user_id', userId);
  }
  return userId;
}

/**
 * Carga el progreso del usuario desde Supabase y lo guarda en localStorage
 */
export async function loadProgressFromSupabase() {
  const userId = getOrCreateUserId();

  const { data, error } = await supabase
    .from('progreso_materias')
    .select('estado')
    .eq('usuario_id', userId)
    .single();

  if (error) {
    console.error('Error cargando el progreso desde Supabase:', error.message);
    return;
  }

  if (data && data.estado) {
    try {
      localStorage.setItem('malla_progreso', JSON.stringify(data.estado));
      console.log('✅ Progreso cargado desde Supabase');
    } catch (e) {
      console.error('Error guardando en localStorage:', e.message);
    }
  } else {
    console.log('ℹ️ No hay progreso guardado en Supabase');
  }
}

/**
 * Guarda o actualiza el estado de materias del usuario en Supabase.
 * @param {Object} estadoMaterias - Objeto JSON con el progreso de las materias.
 */
export async function guardarProgresoMaterias(estadoMaterias) {
  const userId = getOrCreateUserId();

  const { data: existente, error: fetchError } = await supabase
    .from('progreso_materias')
    .select('id')
    .eq('usuario_id', userId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error al buscar progreso existente:', fetchError);
    return;
  }

  if (existente) {
    const { error: updateError } = await supabase
      .from('progreso_materias')
      .update({
        estado: estadoMaterias,
        updated_at: new Date().toISOString(),
      })
      .eq('usuario_id', userId);

    if (updateError) console.error('Error al actualizar progreso:', updateError);
    else console.log('Progreso actualizado correctamente');
  } else {
    const { error: insertError } = await supabase
      .from('progreso_materias')
      .insert({
        usuario_id: userId,
        estado: estadoMaterias,
      });

    if (insertError) console.error('Error al insertar progreso:', insertError);
    else console.log('Progreso guardado correctamente');
  }
}

export const correlativas = {
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

export const materias = {
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
