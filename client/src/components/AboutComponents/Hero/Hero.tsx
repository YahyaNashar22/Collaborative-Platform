import styles from "./Hero.module.css";

import arrowRight from "../../../assets/icons/arrow_right.png";
import HeroWrapper from "../../../shared/HeroWrapper.tsx/HeroWrapper";

const Hero = () => {
  return (
    <HeroWrapper isAbout={true}>
      <div
        className={`${styles.textContainer} d-f align-center justify-center f-dir-col `}
      >
        <h1 className={styles.heroText}>
          <div className={styles.firstSentence}>
            <span className="circled">GREAT</span>
            BUSINESSES
          </div>
          <div className={styles.strength}>ARE BUILD ON GREAT</div>
          <div className={`${styles.arrow_container} d-f`}>
            <img src={arrowRight} className={styles.arrow} alt="arrow-right" />
            <span className={styles.soft}>REALTIONSHIPS</span>
          </div>
          <div className={styles.last}>AND PARTNERSHIPS</div>
        </h1>
      </div>
    </HeroWrapper>
  );
};

export default Hero;
