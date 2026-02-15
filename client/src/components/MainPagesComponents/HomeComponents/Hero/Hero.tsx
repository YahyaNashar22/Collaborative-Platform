import { Link } from "react-router-dom";
import HeroWrapper from "../../../../shared/HeroWrapper.tsx/HeroWrapper";
import styles from "./Hero.module.css";
import { useOutletContext } from "react-router-dom";
import { User } from "../../../../interfaces/User";
import { useLanguageStore } from "../../../../translation/langStore";
import { useTranslation } from "react-i18next";

interface contextType {
  user: { user: User | null };
}

const Hero = () => {
  const { user } = useOutletContext<contextType>();
  const { t } = useTranslation();
  const { language } = useLanguageStore();

  const isArabic = language === "ar";

  return (
    <HeroWrapper>
      <div className={"d-f f-dir-col justify-center"}>
        <h1 className={styles.heroText}>
          {isArabic ? (
            <>
              {t("hero-text-1")}{" "}
              <span className="purple"> {t("hero-text-2")}</span>
            </>
          ) : (
            <>
              {t("hero-text-1")}{" "}
              <span className="purple"> {t("hero-text-2")}</span>
              <div> {t("hero-text-3")}</div>{" "}
            </>
          )}
        </h1>
        {!user && (
          <div className={`${styles.boxContainer} d-f align-center`}>
            <div
              className={`${styles.box} ${styles.leftBox} d-f f-dir-col align-center w-100`}
            >
              <Link to={"/auth/provider"} className="w-100 pointer">
                {t("become-partner")}
              </Link>
              <p>{t("become-partner-desc")}</p>
            </div>
            <div className={`${styles.box} d-f f-dir-col align-center w-100`}>
              <Link to={"/auth/client"} className="w-100 pointer">
                {t("become-client")}
              </Link>
              <p>{t("become-client-desc")}</p>
            </div>
          </div>
        )}
      </div>
    </HeroWrapper>
  );
};

export default Hero;
