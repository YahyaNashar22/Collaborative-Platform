import { useNavigate } from "react-router-dom";

import styles from "./ActiveProjects.module.css";

import EmptyDashboard from "../../components/EmptyDashboard/EmptyDashboard";

const ActiveProjects = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.welcome}>
        Welcome Back <span className={styles.purple}>Full Name</span>
      </h1>
      {/* If not subscribed to any services yet */}
      <EmptyDashboard
        text="Looks like you haven't subscribed to any services yet"
        buttonText="Subscribe Now"
        buttonAction={() => navigate("/dashboard/services")}
      />
    </main>
  );
};

export default ActiveProjects;
