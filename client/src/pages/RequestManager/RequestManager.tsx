import { useNavigate } from "react-router-dom";
import EmptyDashboard from "../../components/EmptyDashboard/EmptyDashboard";
import styles from "./RequestManager.module.css";

const RequestManager = () => {
  const navigate = useNavigate();
  return (
    <main className={styles.wrapper}>
      <section className={styles.titleSection}>
        <h1 className={styles.title}>Request Manager</h1>
      </section>

      <EmptyDashboard
        text="Looks like you don't have any requests yet"
        buttonText="Add Request"
        buttonAction={() => navigate("/dashboard/services")}
      />
    </main>
  );
};

export default RequestManager;
