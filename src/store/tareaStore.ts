import { create } from 'zustand';
import type { Itarea } from '../type/Itarea';

const LOCAL_STORAGE_KEY = 'TASKFLOW_TODOS';

const saveToLocalStorage = (tareas: ItareaExt[]): void => {
  window?.localStorage?.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tareas));
};

const loadFromLocalStorage = (): ItareaExt[] => {
  const data = window?.localStorage?.getItem(LOCAL_STORAGE_KEY);
  try {
    return data ? (JSON.parse(data) as ItareaExt[]) : [];
  } catch (error) {
    console.error('Error al parsear tareas desde localStorage:', error);
    return []; // Devolver array vacío en caso de error de parseo
  }
};

export interface ItareaExt extends Itarea {
  completada?: boolean;
}

interface ItareaStore {
  tareas: ItareaExt[];
  tareaActiva: ItareaExt | null;
  setTareaActiva: (tareaActiva: ItareaExt | null) => void;
  setArrayTareas: (arrayDeTareas: ItareaExt[]) => void;
  agregarNuevaTarea: (nuevaTarea: ItareaExt) => void;
  editarNuevaTarea: (tareaActualizada: ItareaExt) => void;
  eliminarTarea: (idTarea: string) => void;
  eliminarTodas: () => void;
  completarTodas: () => void;
  toggleCompletada: (idTarea: string) => void;
}

export const tareaStore = create<ItareaStore>(set => ({
  tareas: loadFromLocalStorage(),
  tareaActiva: null,
  setTareaActiva: tareaActivaIn => set(() => ({ tareaActiva: tareaActivaIn })),
  setArrayTareas: arrayDeTareas => {
    saveToLocalStorage(arrayDeTareas);
    set(() => ({ tareas: arrayDeTareas }));
  },
  agregarNuevaTarea: (nuevaTarea: ItareaExt) =>
    set(state => {
      const indiceExistente = state.tareas.findIndex(
        t => t.id === nuevaTarea.id
      );
      let tareasActualizadas;

      if (indiceExistente !== -1) {
        console.warn(
          `Intentando agregar tarea con ID existente: ${nuevaTarea.id}. Actualizando en su lugar.`
        );
        tareasActualizadas = [...state.tareas];
        tareasActualizadas[indiceExistente] = nuevaTarea;
      } else {
        tareasActualizadas = [...state.tareas, nuevaTarea];
      }

      saveToLocalStorage(tareasActualizadas);
      return { tareas: tareasActualizadas };
    }),
  editarNuevaTarea: (tareaEditada: ItareaExt) =>
    set(state => {
      const tareasActualizadas = state.tareas.map(tarea =>
        tarea.id === tareaEditada.id ? { ...tarea, ...tareaEditada } : tarea
      );
      saveToLocalStorage(tareasActualizadas);
      return { tareas: tareasActualizadas };
    }),
  eliminarTarea: (idTarea: string) =>
    set(state => {
      const tareasActualizadas = state.tareas.filter(
        tarea => tarea.id !== idTarea
      );
      saveToLocalStorage(tareasActualizadas);
      return { tareas: tareasActualizadas };
    }),
  eliminarTodas: () => {
    saveToLocalStorage([]);
    set(() => ({ tareas: [] }));
  },
  completarTodas: () =>
    set(state => {
      const tareasActualizadas = state.tareas.map(t => ({
        ...t,
        completada: true,
      }));
      saveToLocalStorage(tareasActualizadas);
      return { tareas: tareasActualizadas };
    }),
  toggleCompletada: (idTarea: string) =>
    set(state => {
      const tareasActualizadas = state.tareas.map(t =>
        t.id === idTarea ? { ...t, completada: !t.completada } : t
      );
      saveToLocalStorage(tareasActualizadas);
      return { tareas: tareasActualizadas };
    }),
}));
