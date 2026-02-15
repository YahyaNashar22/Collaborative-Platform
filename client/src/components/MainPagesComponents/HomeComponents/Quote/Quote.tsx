import { useTranslation } from "react-i18next";
import styles from "./Quote.module.css";

const Quote = () => {
  const { t } = useTranslation();
  return (
    <section className={`${styles.wrapper} `} id="quote">
      <div
        className={`${styles.quoteContainer} d-f align-center justify-center w-100 f-dir-col w-100`}
      >
        <h1 className={styles.header}>{t("HOW IT WORKS")}</h1>
        <p className={`${styles.quote}`}>{t("how-it-works-text")}</p>
      </div>
    </section>
  );
};

export default Quote;
