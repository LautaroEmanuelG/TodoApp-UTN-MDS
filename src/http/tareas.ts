<<<<<<< HEAD
import axios from "axios";
import type { Itarea } from "../type/Itarea";

const API_URL = "http://localhost:3000/tareas";

export const getAllTareas = async (): Promise<Itarea[]> => {
  try {
    const response = await axios.get<Itarea[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    return [];
=======
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
>>>>>>> 6298d189e08cef847c3ff6f42b81d27e3760b2d2
  }
};

export const postNuevaTarea = async (nuevaTarea: Itarea): Promise<Itarea> => {
<<<<<<< HEAD
  try {
    const response = await axios.post<Itarea>(API_URL, {
      ...nuevaTarea
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear tarea:", error);
    throw error;
  }
};

export const editarTarea = async (tareaActualizada: Itarea): Promise<Itarea> => {
  try {
    const response = await axios.put<Itarea>(
      `${API_URL}/${tareaActualizada.id}`,
      tareaActualizada
    );
    return response.data;
  } catch (error) {
    console.error("Error al editar tarea:", error);
    throw error;
=======
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
>>>>>>> 6298d189e08cef847c3ff6f42b81d27e3760b2d2
  }
};

export const eliminarTareaPorId = async (idTarea: string): Promise<void> => {
<<<<<<< HEAD
  try {
    await axios.delete(`${API_URL}/${idTarea}`);
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    throw error;
=======
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
>>>>>>> 6298d189e08cef847c3ff6f42b81d27e3760b2d2
  }
};
