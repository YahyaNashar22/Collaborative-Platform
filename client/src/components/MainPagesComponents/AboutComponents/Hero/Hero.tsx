import styles from "./Hero.module.css";

import arrowRight from "../../../../assets/icons/arrow_right.png";
import HeroWrapper from "../../../../shared/HeroWrapper.tsx/HeroWrapper";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <HeroWrapper isAbout={true}>
      <div
        className={`${styles.textContainer} d-f align-center justify-center f-dir-col `}
      >
        <h1 className={styles.heroText}>
          <div className={styles.firstSentence}>
            <span className="circled">{t("about-hero-1")}</span>
            {t("about-hero-2")}
          </div>
          <div className={styles.strength}>{t("about-hero-3")}</div>
          <div className={`${styles.arrow_container} d-f`}>
            <img src={arrowRight} className={styles.arrow} alt="arrow-right" />
            <span className={styles.soft}>{t("about-hero-4")}</span>
          </div>
          <div className={styles.last}>{t("about-hero-5")}</div>
        </h1>
      </div>
    </HeroWrapper>
  );
};

export default Hero;
