import styles from "./CardSkeletonLoading.module.css";

const CardSkeletonLoading = () => {
  return (
    <div className={styles.gridWrapper}>
      {Array.from({ length: 9 }).map((_, index) => (
        <div className={styles.skeletonCard} key={index}>
          <div className={`${styles.skeletonBox} ${styles.skeletonTooltip}`} />
          <div className={`${styles.skeletonBox} ${styles.skeletonImage}`} />
          <div className={`${styles.skeletonBox} ${styles.skeletonTitle}`} />
          <div className={`${styles.skeletonBox} ${styles.skeletonText}`} />
          <div className={`${styles.skeletonBox} ${styles.skeletonText}`} />
          <div className={`${styles.skeletonBox} ${styles.skeletonButton}`} />
        </div>
      ))}
    </div>
  );
};

export default CardSkeletonLoading;
