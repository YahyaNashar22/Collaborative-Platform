import styles from "./Strategy.module.css";

import experience from "../../assets/images/experience_commitment_b.jpg";
import business from "../../assets/images/business_empowrement_b.jpg";
import global from "../../assets/images/global_expertise_b.jpg";
import strategic from "../../assets/images/strategtic_support_b.jpg";

const Strategy = () => {
  return (
    <section className={styles.wrapper} id="strategy">
      <h3 className={styles.title}>
        OUR STRATEGIC <span className={styles.purple}>OBJECTIVES</span>
      </h3>
      <p className={styles.subTitle}>
        We help our clients renew their business
      </p>
      <div className={styles.cardsContainer}>
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
              EXPERIENCE
              <br /> COMMITMENT
            </p>
          </div>
          <p className={styles.lower}>
            We are dedicated to providing our clients with exceptional customer
            experiences. We understand that our success depends on our clients'
            success, and we strive to exceed their expectations in every
            interaction. By delivering high-quality services and solutions, we
            aim to build long-term partnerships based on trust and shared
            growth.
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
              BUSINESS
              <br /> EMPOWERMENT
            </p>
            <span className={styles.purpleDiv}></span>
          </div>
          <p className={styles.lower}>
            We focus on empowering businesses with a wide range of professional
            services. Our expert team provides both operational and strategic
            support to help clients overcome their unique challenges. Through
            collaborative consulting, we assist businesses in optimizing
            operations. Improving processes, and achieving long-term growth.
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
              GLOBAL
              <br /> EXPERTISE
            </p>
          </div>
          <p className={styles.lower}>
            With a global perspective, we use our international expertise to
            give clients a competitive advantage. We understand the challenges
            of the global market and provide customized solutions based on best
            practices. By staying current with industry trends and technology,
            we ensure our clients get the most innovative and effective
            solutions.
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
              STRATEGIC
              <br /> SUPPORT
            </p>
          </div>
          <p className={styles.lower}>
            We aim to be the go-to partner for businesses needing operational
            and strategic support. Our wide range of services covers everything
            from financial planning to operational optimization and strategic
            decisions. With a collaborative and proactive approach, we become a
            key part of our clients' success.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Strategy;
