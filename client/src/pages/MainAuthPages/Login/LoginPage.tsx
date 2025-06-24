import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.formContainer}>
        <label className={styles.inputLabel}>
          Email
          <input
            type="email"
            className={styles.input}
            placeholder="email@domain.com"
            required
          />
        </label>
        <label className={styles.inputLabel}>
          Password
          <input type="password" className={styles.input} required />
        </label>

        <div className={styles.btnContainer}>
          <Link to="/" className={styles.back}>
            Back
          </Link>
          <Link to="/dashboard/active-projects" className={styles.join}>
            Join
          </Link>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
