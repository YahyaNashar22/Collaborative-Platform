import styles from "./UsersRawSkeleton.module.css";

const UsersRawSkeleton = (count: number) => {
  return Array.from({ length: count }).map((_, index) => (
    <tr key={index} className={styles.skeletonRow}>
      <td>
        <div className={styles.shimmerBox}></div>
      </td>
      <td>
        <div className={styles.shimmerBox}></div>
      </td>
      <td>
        <div className={styles.shimmerBox}></div>
      </td>
      <td>
        <div className={styles.shimmerBox}></div>
      </td>
    </tr>
  ));
};

export default UsersRawSkeleton;
