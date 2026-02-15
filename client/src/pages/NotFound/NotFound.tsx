import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>{t("Page Not Found")}</h2>
        <p className={styles.description}>
          {t("The page you're looking for doesn't exist or has been moved.")}
        </p>
        <button
          onClick={() => navigate("/")}
          className={`${styles.button} pointer`}
        >
          {t("Go Home")}
        </button>
      </div>
    </main>
  );
};

export default NotFound;
