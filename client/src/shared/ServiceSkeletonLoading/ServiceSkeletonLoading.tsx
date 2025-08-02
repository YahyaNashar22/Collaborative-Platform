import styles from ".//ServiceSkeletonLoading.module.css";

const ServiceSkeletonLoading = () => {
  return (
    <div className={styles.compactCardsContainer}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div className={styles.compactCard} key={index}>
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonDesc} />
        </div>
      ))}
    </div>
  );
};

export default ServiceSkeletonLoading;
