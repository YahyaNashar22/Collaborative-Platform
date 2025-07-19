import styles from "./CardSkeletonLoading.module.css";

const ServiceCardSkeletonGrid = () => {
  return (
    <div className={styles.gridWrapper}>
      {Array.from({ length: 9 }).map((_, index) => (
        <div className={styles.skeletonCard} key={index}>
          <div
            className={`${styles.skeletonBox} ${styles.skeletonHeader}`}
          ></div>
          <div className={`${styles.skeletonBox} ${styles.skeletonBody}`}></div>
          <div className={styles.skeletonFooter}>
            <div
              className={`${styles.skeletonBox} ${styles.skeletonDeadline}`}
            ></div>
            <div
              className={`${styles.skeletonBox} ${styles.skeletonButton}`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCardSkeletonGrid;
