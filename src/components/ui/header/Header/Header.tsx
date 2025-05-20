import styles from './Header.module.css';
export const Header = () => {
  return (
    <div className={styles.containerHeader}>
      <div className={styles.containerTituloHeader}>
        <h2>TodoApp Pro</h2>
        <span className={styles.slogan}>
          Organiza tus tareas de forma simple y clara
        </span>
      </div>
    </div>
  );
};
