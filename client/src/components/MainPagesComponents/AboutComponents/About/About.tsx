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
          Takatuf is a smart platform powered by AI that connects people and
          companies with the right consultants in finance, management,
          marketing, IT, and digital services. Using artificial intelligence, we
          match every need with the right expert to deliver fast, effective, and
          custom solutions. Takatuf helps businesses and individuals in Saudi
          Arabia get access to top global expertise at fair prices. At the same
          time, it gives international companies the chance to enter the Saudi
          market, grow their customer base, and invest in the future. Everything
          we do supports Vision 2030, encouraging innovation, welcoming
          startups, and opening the door for global companies to
          succeed in the Kingdom.
        </p>
      </div>
      <img src={laptop} className={styles.aboutImage} alt="laptop" />

      {/* ---------Bg Decoration------------ */}
      <img src={lines} className={styles.lines} alt="lines" />
    </section>
  );
};

export default About;
