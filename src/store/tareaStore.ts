import { create } from 'zustand';
import type { Itarea } from '../type/Itarea';

const LOCAL_STORAGE_KEY = 'TASKFLOW_TODOS';

export interface ItareaExt extends Itarea {
  completada?: boolean;
}

const saveToLocalStorage = (tareas: ItareaExt[]): void => {
  window?.localStorage?.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tareas));
};

const loadFromLocalStorage = (): ItareaExt[] => {
  const data = window?.localStorage?.getItem(LOCAL_STORAGE_KEY);
  return data ? (JSON.parse(data) as ItareaExt[]) : [];
};

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
  agregarNuevaTarea: nuevaTarea =>
    set(state => {
      const nuevasTareas = [
        ...state.tareas,
        { ...nuevaTarea, completada: false },
      ];
      saveToLocalStorage(nuevasTareas);
      return { tareas: nuevasTareas };
    }),
  editarNuevaTarea: tareaEditada =>
    set(state => {
      const arregloTareas = state.tareas.map(tarea =>
        tarea.id === tareaEditada.id
          ? { ...tareaEditada, completada: tarea.completada ?? false }
          : tarea
      );
      saveToLocalStorage(arregloTareas);
      return { tareas: arregloTareas };
    }),
  eliminarTarea: idTarea =>
    set(state => {
      const arregloTareas = state.tareas.filter(tarea => tarea.id !== idTarea);
      saveToLocalStorage(arregloTareas);
      return { tareas: arregloTareas };
    }),
  eliminarTodas: () => {
    saveToLocalStorage([]);
    set(() => ({ tareas: [] }));
  },
  completarTodas: () =>
    set(state => {
      const nuevasTareas = state.tareas.map(t => ({ ...t, completada: true }));
      saveToLocalStorage(nuevasTareas);
      return { tareas: nuevasTareas };
    }),
  toggleCompletada: idTarea =>
    set(state => {
      const nuevasTareas = state.tareas.map(t =>
        t.id === idTarea ? { ...t, completada: !t.completada } : t
      );
      saveToLocalStorage(nuevasTareas);
      return { tareas: nuevasTareas };
    }),
}));
