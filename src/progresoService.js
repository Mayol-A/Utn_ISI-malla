import { supabase } from './supabaseClient';
import { getOrCreateUserId } from './utils';

export async function guardarProgreso(progreso) {
  const userId = getOrCreateUserId();

  const { error } = await supabase
    .from('progresos')
    .upsert([
      {
        user_id: userId,
        progreso: JSON.stringify(progreso),
      }
    ]);

  if (error) console.error("Error al guardar progreso sorry:", error);
}

export async function cargarProgreso() {
  const userId = getOrCreateUserId();

  const { data, error } = await supabase
    .from('progresos')
    .select('progreso')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.warn("No se encontró progreso guardado o hubo error sorry:", error);
    return null;
  }

  return JSON.parse(data.progreso);
}

