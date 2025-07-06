import styles from "./Dashboard.module.css";
import { Chart as ChartJS } from "chart.js/auto";

const Dashboard = () => {
  return (
    <main className={`${styles.wrapper} w-100`}>
      <div className={styles.header}></div>
    </main>
  );
};

export default Dashboard;
