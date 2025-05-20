import { useEffect, useState } from 'react';
import { tareaStore } from '../../../../store/tareaStore';
import styles from './ListTareas.module.css';
import { CardList } from '../CardList/CardList';
import { Modal } from '../Modal/Modal';
import type { ItareaExt } from '../../../../store/tareaStore';
import { useTareas } from '../../../../hooks/useTareas';

export const ListTareas = () => {
  const setTareaActiva = tareaStore(state => state.setTareaActiva);
  const { getTareas, tareas, eliminarTodas, completarTodas, toggleCompletada } =
    useTareas();

  useEffect(() => {
    getTareas();
  }, []);

  const [OpenModalTarea, setOpenModalTarea] = useState(false);

  const handleOpenModalEdit = (tarea: ItareaExt) => {
    setTareaActiva(tarea);
    setOpenModalTarea(true);
  };

  const handleCloseModal = () => {
    setOpenModalTarea(false);
  };

  const tareasPendientes = tareas.filter(t => !t.completada);
  const tareasCompletadas = tareas.filter(t => t.completada);

  return (
    <>
      <div className={styles.containerPrincipalListTareas}>
        <div className={styles.containerTitleAndButton}>
          <h2>📝 Mis Actividades</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setOpenModalTarea(true)}>
              <span className={styles.yellowPlus}>+</span> Nueva Actividad
            </button>
            <button
              style={{ color: '#ffe600' }}
              onClick={completarTodas}>
              Completar todas
            </button>
            <button
              style={{ color: '#fff' }}
              onClick={eliminarTodas}>
              Eliminar todas
            </button>
          </div>
        </div>
        <div className={styles.containerList}>
          {tareasPendientes.length > 0 ? (
            tareasPendientes.map(el => (
              <div
                key={el.id}
                style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={el.completada ?? false}
                  onChange={() => toggleCompletada(el.id!)}
                  style={{ marginRight: '1rem' }}
                />
                <CardList
                  handleOpenModalEdit={handleOpenModalEdit}
                  tarea={el}
                />
              </div>
            ))
          ) : (
            <div>
              <h3>¡Sin tareas pendientes!</h3>
            </div>
          )}
        </div>
        {tareasCompletadas.length > 0 && (
          <div
            className={styles.containerList}
            style={{
              marginTop: '2rem',
              background: '#181818',
              border: '2px solid #ffe600',
            }}>
            <h3 style={{ color: '#ffe600', marginBottom: '1rem' }}>
              Tareas completadas
            </h3>
            {tareasCompletadas.map(el => (
              <div
                key={el.id}
                style={{ display: 'flex', alignItems: 'center', opacity: 0.7 }}>
                <input
                  type="checkbox"
                  checked={el.completada ?? false}
                  onChange={() => toggleCompletada(el.id!)}
                  style={{ marginRight: '1rem' }}
                />
                <CardList
                  handleOpenModalEdit={handleOpenModalEdit}
                  tarea={el}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {OpenModalTarea && <Modal handleCloseModal={handleCloseModal} />}
    </>
  );
};
