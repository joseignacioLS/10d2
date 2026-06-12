import styles from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <img src="/dice.svg" />
    </div>
  );
};
