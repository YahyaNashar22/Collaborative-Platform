import Dashboard from "../../../components/DashboadComponents/Dashboard/Dashboard";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  return (
    <div className={`${styles.wrapper} d-f w-100`}>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
