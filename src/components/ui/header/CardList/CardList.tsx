import type { Itarea } from '../../../../type/Itarea';
import type { FC } from 'react';
import styles from './CardList.module.css';
import { useTareas } from '../../../../hooks/useTareas';

type IcardList = {
  tarea: Itarea;
  handleOpenModalEdit: (tarea: Itarea) => void;
};

export const CardList: FC<IcardList> = ({ tarea, handleOpenModalEdit }) => {
  const { eliminarUnaTarea } = useTareas();
  const eliminarTareaById = () => {
    eliminarUnaTarea(tarea.id!);
  };
  const editarTarea = () => {
    handleOpenModalEdit(tarea);
  };

  return (
    <div className={styles.containerCard}>
      <div>
        <h3>📌 {tarea.titulo}</h3>
        <p>{tarea.descripcion}</p>
        <p>
          <b>⏰ {tarea.fechaLimite}</b>
        </p>
      </div>
      <div className={styles.actionCard}>
        <button
          onClick={eliminarTareaById}
          className={styles.deleteBtn}>
          🗑️
        </button>
        <button
          onClick={editarTarea}
          className={styles.editBtn}>
          ✏️
        </button>
      </div>
    </div>
  );
};
