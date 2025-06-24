import FAQ from "../../../components/MainPagesComponents/FAQComponents/FAQ/FAQ";
import styles from "./FAQPage.module.css";

const FAQPage = () => {
  return (
    <div
      className={`${styles.wrapper} container d-f f-dir-col justify-between`}
    >
      <FAQ />
    </div>
  );
};

export default FAQPage;
