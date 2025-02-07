import { Link } from "react-router-dom";
import styles from "./ClientSignupPage.module.css";

const ClientSignupPage = () => {
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Welcome Aboard!</h1>
      <h2 className={styles.subtitle}>
        We're looking forward to elevate you business
      </h2>

      <form className={styles.formContainer}>
        <label className={styles.inputLabel}>
          First Name
          <input
            type="text"
            className={styles.input}
            placeholder="First Name"
          />
        </label>

        <label className={styles.inputLabel}>
          Last Name
          <input type="text" className={styles.input} placeholder="last Name" />
        </label>

        <label className={styles.inputLabel}>
          Email
          <input
            type="email"
            className={styles.input}
            placeholder="email@domain.com"
          />
        </label>

        <label className={styles.inputLabel}>
          Password
          <input type="password" className={styles.input} />
        </label>

        <label className={styles.inputLabel}>
          Phone
          <input
            type="text"
            className={styles.input}
            placeholder="+1 123 123 123"
          />
        </label>

        <label className={styles.inputLabel}>
          Profile Picture
          <input type="file" className={styles.input} />
        </label>

        <label className={styles.inputLabel}>
          Company
          <select className={styles.input} value={"company"}>
            <option value={"company"}>Company</option>
            <option value={"individual"}>Individual</option>
          </select>
        </label>

        <label className={styles.inputLabel}>
          Address
          <input
            type="text"
            className={styles.input}
            placeholder="Country, state, street"
          />
        </label>

        <label className={styles.inputLabel}>
          Language
          <select className={styles.input} value={"english"}>
            <option value={"english"}>English</option>
            <option value={"arabic"}>Arabic</option>
            <option value={"english-arabic"}>English + Arabic</option>
          </select>
        </label>

        <label className={styles.inputLabel}>
          How soon would you like to get our services
          <select className={styles.input} value={"immediately"}>
            <option value={"immediately"}>immediately</option>
            <option value={"within a month"}>within a month</option>
            <option value={"in the next 2-3 months"}>
              in the next 2-3 months
            </option>
            <option value={"in the next 4-6 months"}>
              in the next 4-6 months
            </option>
            <option value={"in the next 6-12 months"}>
              in the next 6-12 months
            </option>
            <option value={"others"}>others</option>
          </select>
        </label>

        <label className={styles.inputLabel}>
          Estimated Budget
          <input type="text" className={styles.input} placeholder="700$" />
        </label>

        <label className={styles.inputLabel}>
          Scope of work
          <input type="file" className={styles.input} />
        </label>

<div className={styles.btnContainer}>
<Link to={'/'} className={styles.back}>Back</Link>
<Link to={'/'} className={styles.join}>Join</Link>
</div>
    
      </form>
    </main>
  );
};

export default ClientSignupPage;
