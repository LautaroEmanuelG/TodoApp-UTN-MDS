import { useShallow } from 'zustand/shallow';
import { tareaStore } from '../store/tareaStore';
import type { ItareaExt } from '../store/tareaStore';
import {
  eliminarTareaPorId,
  getAllTareas,
  postNuevaTarea,
} from '../http/tareas';
import { editarTarea } from '../http/tareas';
import Swal from 'sweetalert2';

export const useTareas = () => {
  const {
    tareas,
    setArrayTareas,
    agregarNuevaTarea,
    eliminarTarea,
    editarNuevaTarea,
    eliminarTodas,
    completarTodas,
    toggleCompletada,
  } = tareaStore(
    useShallow(state => ({
      tareas: state.tareas,
      setArrayTareas: state.setArrayTareas,
      agregarNuevaTarea: state.agregarNuevaTarea,
      eliminarTarea: state.eliminarTarea,
      editarNuevaTarea: state.editarNuevaTarea,
      eliminarTodas: state.eliminarTodas,
      completarTodas: state.completarTodas,
      toggleCompletada: state.toggleCompletada,
    }))
  );

  const getTareas = async () => {
    const data = await getAllTareas();
    if (data) setArrayTareas(data);
  };

  const crearTarea = async (nuevaTareaSinId: Omit<ItareaExt, 'id'>) => {
    try {
      const tareaPersistida = await postNuevaTarea(
        nuevaTareaSinId as ItareaExt
      );

      agregarNuevaTarea(tareaPersistida);

      Swal.fire('Éxito', 'Tarea creada correctamente', 'success');
    } catch (error) {
      console.error('Algo salió mal al crear la tarea:', error);
      Swal.fire('Error', 'No se pudo crear la tarea', 'error');
    }
  };

  const putTareaEditar = async (tareaEditada: ItareaExt) => {
    const tareaOriginal = tareas.find(el => el.id === tareaEditada.id);
    if (!tareaOriginal) {
      console.error('Error: Tarea original no encontrada para editar.');
      Swal.fire('Error', 'No se pudo encontrar la tarea para editar.', 'error');
      return;
    }

    editarNuevaTarea(tareaEditada);

    try {
      await editarTarea(tareaEditada);
      Swal.fire('Éxito', 'Tarea actualizada correctamente', 'success');
    } catch (error) {
      console.error('Algo salió mal al editar una tarea:', error);
      editarNuevaTarea(tareaOriginal);
      Swal.fire('Error', 'No se pudo actualizar la tarea', 'error');
    }
  };

  const eliminarUnaTarea = async (idTarea: string) => {
    const estadoPrevio = tareas.find(el => el.id == idTarea);
    const confirm = await Swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (!confirm.isConfirmed) return;
    eliminarTarea(idTarea);
    try {
      await eliminarTareaPorId(idTarea);
      Swal.fire('Eliminado', 'tarea eliminada correctamente');
    } catch (error) {
      if (estadoPrevio) agregarNuevaTarea(estadoPrevio);
      console.log('algo salio mal al eliminar una tarea');
    }
  };

  return {
    getTareas,
    crearTarea,
    putTareaEditar,
    eliminarUnaTarea,
    tareas,
    eliminarTodas,
    completarTodas,
    toggleCompletada,
  };
};
