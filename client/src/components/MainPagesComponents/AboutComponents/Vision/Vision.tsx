import styles from "./Vision.module.css";

import logo from "../../../../assets/icons/logo_white.png";
import vision from "../../../../assets/icons/vision_ico.png";
import mission from "../../../../assets/icons/mission_ico.png";
import expertise from "../../../../assets/icons/project_management_ico.png";
import { useTranslation } from "react-i18next";

const Vision = () => {
  const { t } = useTranslation();
  return (
    <section
      className={`${styles.wrapper} d-f align-center justify-center`}
      id="vision"
    >
      <div className={styles.left}>
        <div className={styles.logoContainer}>
          <img
            src={logo}
            className={styles.logo}
            width={72}
            height={72}
            alt="logo"
          />
        </div>
        <div className={styles.leftText}>
          {t("YOUR GATEWAY")} <br />
          <div>
            {t("TO")} <span className="purple"> {t("SAUDI")}</span>
          </div>
          <div className="purple">{t("ARABIA'S")}</div>
          <div>{t("BUSINESS")}</div>
          <div className={`circled ${styles.landscape}`}>{t("LANDSCAPE")}</div>
          <br />
          <div className={styles.dots}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className={`align-text ${styles.right}`}>
        {/* vision block */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>
            <span className={styles.blockIcon}>
              <img src={vision} alt="vision" width={40} height={40} />
            </span>
            {t("VISION")}
          </h3>
          <div className={styles.blockText}>
            {t("To be the premier destination for specialized consulting in")}
            <span className="purple"> {t("Saudi Arabia")} </span>{" "}
            {t(
              "by providing an integrated platform that allows individuals and companies to access a select group of experts, thereby fostering",
            )}
            <span className="purple"> {t("innovation")} </span>,{" "}
            {t(
              "supporting economic growth, and contributing to the achievement of",
            )}
            <span className="purple"> {t("Vision 2030's")} </span>{" "}
            {t("objectives.")}
          </div>
        </div>
        {/* mission block */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>
            <span className={styles.blockIcon}>
              <img src={mission} alt="mission" width={40} height={40} />
            </span>
            {t("MISSION")}
          </h3>
          <div className={styles.blockText}>
            {t(
              "We are committed to empowering individuals and companies by offering",
            )}{" "}
            <span className="purple">
              {t("high-quality consulting solutions")}
            </span>{" "}
            {t(
              "and connecting them with the best experts locally and internationally, ensuring",
            )}{" "}
            <span className="purple">
              {t("professionalism and competitiveness.")}
            </span>{" "}
            {t(
              "We strive to facilitate strategic decision-making, enhance business success, and support their expansion in local and global markets.",
            )}
          </div>
        </div>
        {/* expertise block  */}
        <div className={styles.block}>
          <h3 className={styles.blockTitle}>
            <span className={styles.blockIcon}>
              <img src={expertise} alt="expertise" width={40} height={40} />
            </span>
            {t("EXPERTISE")}
          </h3>
          <div className={styles.blockText}>
            {t("Our team consists of")}{" "}
            <span className="purple">{t("top professionals")}</span>{" "}
            {t(
              "and industry experts dedicated to providing strategic solutions tailored to your business needs. With diverse expertise across multiple sectors, we ensure that our clients receive the best consultancy services to drive success and",
            )}{" "}
            <span className="purple">{t("sustainable growth.")}</span>
          </div>
        </div>
      </div>
      <p className={styles.consultingText}>{t("CONSULTING")}</p>
    </section>
  );
};

export default Vision;
