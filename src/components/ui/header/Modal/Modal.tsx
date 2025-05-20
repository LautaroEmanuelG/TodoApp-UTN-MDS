import {
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from 'react';
import { tareaStore } from '../../../../store/tareaStore';
import styles from './Modal.module.css';
import type { Itarea } from '../../../../type/Itarea';
import { useTareas } from '../../../../hooks/useTareas';

type IModal = {
  handleCloseModal: VoidFunction;
};

const inicialState: Itarea = {
  titulo: '',
  descripcion: '',
  fechaLimite: '',
};

export const Modal: FC<IModal> = ({ handleCloseModal }) => {
  const tareaActiva = tareaStore(state => state.tareaActiva);
  const setTareaActiva = tareaStore(state => state.setTareaActiva);

  const { crearTarea, putTareaEditar } = useTareas();

  const [fromValues, setFromValues] = useState<Itarea>(inicialState);

  useEffect(() => {
    if (tareaActiva) setFromValues(tareaActiva);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFromValues(prev => ({ ...prev, [`${name}`]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (tareaActiva) {
      putTareaEditar(fromValues);
    } else {
      crearTarea({ ...fromValues, id: new Date().toDateString() });
    }
    setTareaActiva(null);
    handleCloseModal();
  };

  return (
    <div className={styles.containerPrincipalModal}>
      <div className={styles.contentPopUp}>
        <div>
          <h3>{tareaActiva ? 'Editar Actividad' : 'Nueva Actividad'} </h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className={styles.formContent}>
          <div>
            <input
              onChange={handleChange}
              value={fromValues.titulo}
              placeholder="Título de la actividad"
              type="text"
              required
              autoComplete="off"
              name="titulo"
              className={styles.inputBrutal}
            />
            <textarea
              onChange={handleChange}
              value={fromValues.descripcion}
              placeholder="Descripción detallada"
              required
              name="descripcion"
              className={styles.inputBrutal}
            />
            <input
              onChange={handleChange}
              value={fromValues.fechaLimite}
              type="date"
              required
              autoComplete="off"
              name="fechaLimite"
              className={styles.inputBrutal}
            />
          </div>
          <div className={styles.buttonCards}>
            <button
              onClick={handleCloseModal}
              className={styles.cancelBtn}>
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.createBtn}>
              {tareaActiva ? 'Guardar Cambios' : 'Crear Actividad'}{' '}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
