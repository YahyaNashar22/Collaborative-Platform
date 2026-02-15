import { useTranslation } from "react-i18next";
import styles from "./About.module.css";

const About = () => {
  const { t } = useTranslation();
  return (
    <section className="d-f align-center justify-center">
      <main className={`${styles.wrapper} d-f f-dir-col `}>
        <h1 className={styles.header}>
          <span className="purple">{t("TAKATUF")}</span>{" "}
          <span className="bold">
            {t("IS A PLATFORM DEDICATED TO CONNECTING CLIENTS")}
          </span>{" "}
          <span className="thin">{t("WITH CONSULTANCY SERVICE")}</span>
        </h1>
        <small>{t("about")}</small>
      </main>
    </section>
  );
};

export default About;
