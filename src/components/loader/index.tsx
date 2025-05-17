import styles from "./Loader.module.css";

type LoaderProps = {
  isLoading: boolean;
};

const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <div className={styles.loader_overlay}>
      <div
        className={`${styles.loader} ${
          isLoading === false ? styles.hide_loader : ""
        }`}
      />
    </div>
  );
};

export default Loader;
