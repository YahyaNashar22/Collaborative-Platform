import styles from "./Strategy.module.css";

import experience from "../../../../assets/images/experience_commitment_b.jpg";
import business from "../../../../assets/images/business_empowrement_b.jpg";
import global from "../../../../assets/images/global_expertise_b.jpg";
import strategic from "../../../../assets/images/strategtic_support_b.jpg";
import { useTranslation } from "react-i18next";

const Strategy = () => {
  const { t } = useTranslation();

  const strategyData = [
    {
      image: experience,
      alt: t("experience commitment"),
      title: t("EMPOWER BUSINESS"),
      description: t(
        "Facilitate access to high-quality consultancy services that enhance decision-making and operational efficiency.",
      ),
    },
    {
      image: business,
      alt: t("business empowerment"),
      title: t("PROMOTE INNOVATION"),
      description: t(
        "Support businesses in adopting cutting-edge solutions that align with the latest market trends.",
      ),
    },
    {
      image: global,
      alt: t("global expertise"),
      title: t("EXPAND GLOBAL ACCESS"),
      description: t(
        "Provide a gateway for international firms to enter and thrive in the Saudi market.",
      ),
    },
    {
      image: strategic,
      alt: t("strategic support"),
      title: t("SUPPORT ECONOMIC GROWTH"),
      description: t(
        "Contribute to Vision 2030 by fostering local and international investments in Saudi Arabia.",
      ),
    },
  ];

  return (
    <section className={styles.wrapper} id="market_place">
      <div className={styles.header}>
        <h3 className={styles.title}>
          {t("OUR STRATEGIC")} <span className="purple">{t("OBJECTIVES")}</span>
        </h3>
        <p className={styles.subTitle}>
          {t("We help our clients renew their business")}
        </p>
      </div>

      <div className={styles.cardsContainer}>
        {strategyData.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.alt} className={styles.cardImg} />
              <div className={styles.cardOverlay}>
                <p className={styles.cardTitle}>{item.title}</p>
              </div>
            </div>
            <p className={styles.cardDescription}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Strategy;
