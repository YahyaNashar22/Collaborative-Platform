import styles from "./Strategy.module.css";

import experience from "../../../assets/images/experience_commitment_b.jpg";
import business from "../../../assets/images/business_empowrement_b.jpg";
import global from "../../../assets/images/global_expertise_b.jpg";
import strategic from "../../../assets/images/strategtic_support_b.jpg";

const Strategy = () => {
  return (
    <section
      className={`${styles.wrapper} d-f w-100 justify-center align-center f-dir-col`}
      id="market_place"
    >
      <h3 className={styles.title}>
        OUR STRATEGIC <span className="purple">OBJECTIVES</span>
      </h3>
      <p className={styles.subTitle}>
        We help our clients renew their business
      </p>
      <div className={`align-text ${styles.cardsContainer}`}>
        {/* experience commitment */}
        <div className={styles.cardContainer}>
          <div className={styles.upper}>
            <img
              src={experience}
              width={300}
              height={200}
              className={styles.cardImg}
              alt="experience commitment"
            />
            <p className={styles.cardTitle}>
              EMPOWER
              <br /> BUSINESS
            </p>
          </div>
          <p className={styles.lower}>
            Facilitate access to high-quality consultancy services that enhance
            decision-making and operational efficiency.
          </p>
        </div>
        {/* business empowerment */}
        <div className={styles.cardContainer}>
          <div className={styles.upper}>
            <img
              src={business}
              width={300}
              height={200}
              className={styles.cardImg}
              alt="business empowerment"
            />
            <p className={styles.cardTitle}>
              PROMOTE
              <br /> INNOVATION
            </p>
          </div>
          <p className={styles.lower}>
            Support businesses in adopting cutting-edge solutions that align
            with the latest market trends.
          </p>
        </div>
        {/* global  */}
        <div className={styles.cardContainer}>
          <div className={styles.upper}>
            <img
              src={global}
              width={300}
              height={200}
              className={styles.cardImg}
              alt="global expertise"
            />
            <p className={styles.cardTitle}>
              EXPAND
              <br />
              GLOBAL
              <br />
              ACCESS
            </p>
          </div>
          <p className={styles.lower}>
            Provide a gateway for international firms to enter and thrive in the
            Saudi market.
          </p>
        </div>
        {/* strategic support  */}
        <div className={styles.cardContainer}>
          <div className={styles.upper}>
            <img
              src={strategic}
              width={300}
              height={200}
              className={styles.cardImg}
              alt="strategic support"
            />
            <p className={styles.cardTitle}>
              SUPPORT
              <br />
              ECONOMIC
              <br />
              GROWTH
            </p>
          </div>
          <p className={styles.lower}>
            Contribute to Vision 2030 by fostering local and international
            investments in Saudi Arabia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Strategy;
