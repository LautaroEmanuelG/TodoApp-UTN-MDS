import type { Itarea } from '../type/Itarea';

const API_URL =
  typeof window !== 'undefined' && (window as any).API_URL
    ? (window as any).API_URL
    : undefined;
const LOCAL_STORAGE_KEY = 'TASKFLOW_TODOS';

const saveToLocalStorage = (tareas: Itarea[]): void => {
  window?.localStorage?.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tareas));
};

const loadFromLocalStorage = (): Itarea[] => {
  const data = window?.localStorage?.getItem(LOCAL_STORAGE_KEY);
  return data ? (JSON.parse(data) as Itarea[]) : [];
};

export const getAllTareas = async (): Promise<Itarea[]> => {
  if (!API_URL) {
    return loadFromLocalStorage();
  }
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    return loadFromLocalStorage();
  }
};

export const postNuevaTarea = async (nuevaTarea: Itarea): Promise<Itarea> => {
  if (!API_URL) {
    const tareas = loadFromLocalStorage();
    const tareaConId = {
      ...nuevaTarea,
      id: nuevaTarea.id ?? crypto.randomUUID(),
    };
    saveToLocalStorage([...tareas, tareaConId]);
    return tareaConId;
  }
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaTarea),
    });
    return await response.json();
  } catch (error) {
    const tareas = loadFromLocalStorage();
    const tareaConId = {
      ...nuevaTarea,
      id: nuevaTarea.id ?? crypto.randomUUID(),
    };
    saveToLocalStorage([...tareas, tareaConId]);
    return tareaConId;
  }
};

export const editarTarea = async (
  tareaActualizada: Itarea
): Promise<Itarea> => {
  if (!API_URL) {
    const tareas = loadFromLocalStorage();
    const nuevasTareas = tareas.map(t =>
      t.id === tareaActualizada.id ? tareaActualizada : t
    );
    saveToLocalStorage(nuevasTareas);
    return tareaActualizada;
  }
  try {
    const response = await fetch(`${API_URL}/${tareaActualizada.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tareaActualizada),
    });
    return await response.json();
  } catch (error) {
    const tareas = loadFromLocalStorage();
    const nuevasTareas = tareas.map(t =>
      t.id === tareaActualizada.id ? tareaActualizada : t
    );
    saveToLocalStorage(nuevasTareas);
    return tareaActualizada;
  }
};

export const eliminarTareaPorId = async (idTarea: string): Promise<void> => {
  if (!API_URL) {
    const tareas = loadFromLocalStorage();
    const nuevasTareas = tareas.filter(t => t.id !== idTarea);
    saveToLocalStorage(nuevasTareas);
    return;
  }
  try {
    await fetch(`${API_URL}/${idTarea}`, { method: 'DELETE' });
  } catch (error) {
    const tareas = loadFromLocalStorage();
    const nuevasTareas = tareas.filter(t => t.id !== idTarea);
    saveToLocalStorage(nuevasTareas);
  }
};
