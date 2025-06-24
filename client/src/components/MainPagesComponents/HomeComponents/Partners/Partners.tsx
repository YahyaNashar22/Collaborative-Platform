import styles from "./Partners.module.css";

const Partners = () => {
  return (
    <section className={`${styles.wrapper} d-f f-dir-col`}>
      <h1 className={styles.title}>OUR PARTNERS</h1>
      <div className="d-f align-center justify-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="intense purple" key={index}>
            LOGO
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
