import styles from "./Quote.module.css";

import logo from "../../../../assets/icons/logo_white.png";
import { useTranslation } from "react-i18next";

const Quote = () => {
  const { t } = useTranslation();
  return (
    <section
      className={`${styles.wrapper} d-f align-center justify-center w-100 `}
      id="quote"
    >
      <img src={logo} className={styles.logo} alt="logo" />
      <p className={` ${styles.quote}`}>{t("about-quote")}</p>
    </section>
  );
};

export default Quote;
