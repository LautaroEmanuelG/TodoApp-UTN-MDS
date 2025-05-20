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
  }
};

export const postNuevaTarea = async (nuevaTarea: Itarea): Promise<Itarea> => {
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
  }
};

export const eliminarTareaPorId = async (idTarea: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${idTarea}`);
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    throw error;
  }
};
