import Terms from "../../components/TermsComponents/Terms/Terms";
import styles from "./TermsPage.module.css";

const TermsPage = () => {
  return (
    <div
      className={`${styles.wrapper} container d-f f-dir-col justify-between`}
    >
      <Terms />
    </div>
  );
};

export default TermsPage;
