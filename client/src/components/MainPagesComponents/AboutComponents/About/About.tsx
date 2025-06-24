import styles from "./About.module.css";

import laptop from "../../../../assets/images/hands_laptop.png";
import lines from "../../../../assets/icons/lines.png";

const About = () => {
  return (
    <section
      className={`${styles.wrapper} d-f align-center justify-center w-100 container`}
      id="about"
    >
      <div className={`${styles.content} d-f f-dir-col`}>
        <h2 className={styles.header}>
          <span className="purple">CREATING</span> AN IMPACT DAILY IN ALL
          ASPECTS OF OUR WORK
        </h2>
        <p className={`align-text ${styles.bio}`}>
          Takatuf is a platform specializing in connecting clients with
          consultancy service providers across various fields, including
          financial, managerial, marketing, information technology, and digital
          consulting. We offer innovative solutions that assist businesses and
          individuals in Saudi Arabia to access high-quality global expertise at
          competitive prices. Our platform also enables international companies
          to enter the Saudi market and build a strong customer base that
          supports their expansion and future investments, aligning with the
          Kingdom's Vision 2030 to promote innovation and attract both startups
          and global enterprises.
        </p>
      </div>
      <img src={laptop} className={styles.aboutImage} alt="laptop" />

      {/* ---------Bg Decoration------------ */}
      <img src={lines} className={styles.lines} alt="lines" />
    </section>
  );
};

export default About;
