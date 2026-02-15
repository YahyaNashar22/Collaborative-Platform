import styles from "./About.module.css";

import laptop from "../../../../assets/images/hands_laptop.png";
import lines from "../../../../assets/icons/lines.png";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <section
      className={`${styles.wrapper} d-f align-center justify-center w-100 container`}
      id="about"
    >
      <div className={`${styles.content} d-f f-dir-col`}>
        <h2 className={styles.header}>
          <span className="purple">{t("CREATING")}</span>{" "}
          {t("AN IMPACT DAILY IN ALL ASPECTS OF OUR WORK")}
        </h2>
        <p className={` ${styles.bio}`}>{t("about-bio")}</p>
      </div>
      <img src={laptop} className={styles.aboutImage} alt="laptop" />

      {/* ---------Bg Decoration------------ */}
      <img src={lines} className={styles.lines} alt="lines" />
    </section>
  );
};

export default About;
