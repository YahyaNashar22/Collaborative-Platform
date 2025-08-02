import styles from "./PhasesSkeletonLoading.module.css";

const PhasesSkeletonLoading = () => (
  <div className={styles.wrapper}>
    {Array(3)
      .fill(0)
      .map((_, idx) => (
        <div key={idx} className={styles.phaseCard}>
          <div className={styles.header}>
            <div className={`${styles.title} ${styles.skeleton}`}></div>
            <div className={`${styles.badge} ${styles.skeleton}`}></div>
          </div>
          <div className={`${styles.lineShort} ${styles.skeleton}`}></div>
          <div className={`${styles.textArea} ${styles.skeleton}`}></div>
          <div className={styles.dateRow}>
            <div className={`${styles.dateField} ${styles.skeleton}`}></div>
            <div className={`${styles.dateField} ${styles.skeleton}`}></div>
          </div>
          <div className={styles.footer}>
            <div className={`${styles.status} ${styles.skeleton}`}></div>
            <div className={`${styles.button} ${styles.skeleton}`}></div>
          </div>
        </div>
      ))}
  </div>
);

export default PhasesSkeletonLoading;
