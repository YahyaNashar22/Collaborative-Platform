import styles from "./About.module.css";

import laptop from "../../assets/images/hands_laptop.png";
import lines from "../../assets/icons/lines.png";

const About = () => {
  return (
    <section className={styles.wrapper} id="about">
      <div className={styles.content}>
        <h2 className={styles.header}>
          <span className={styles.purple}>CREATING</span> AN IMPACT DAILY IN ALL
          ASPECTS OF OUR WORK
        </h2>
        <p className={styles.bio}>
          Collaborative Consulting Company (CCC) is a dynamic consulting firm
          that was established in Jan 2024. Our primary objective is to provide
          comprehensive support to companies of all sizes in the Middle East,
          including the Saudi and Jordan markets. At CCC, we pride ourselves on
          our proven track record of successfully guiding our clients through
          the transition from small enterprises to thriving businesses across
          various sectors. With our expertise and guidance, your company can
          unlock its full potential and achieve remarkable growth.
        </p>
        <p className={styles.bio}>
          Join us at CCC and allow us to be your trusted partner in driving your
          business towards unparalleled success in the Middle East and beyond!
        </p>
      </div>
      <img src={laptop} className={styles.aboutImage} alt="laptop" />

      {/* ---------Bg Decoration------------ */}
      <img src={lines} className={styles.lines} alt="lines" />
    </section>
  );
};

export default About;
