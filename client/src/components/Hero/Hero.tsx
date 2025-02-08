import { Link } from "react-router-dom";

import styles from "./Hero.module.css";

import person from "../../assets/images/saudi_laptop.png";
import arrowRight from "../../assets/icons/arrow_right.png";
import leftArrow from "../../assets/icons/left_purple_arrow.png";
import purpleArrow from "../../assets/icons/purple_arrow.png";
import diagonalLine from "../../assets/icons/diagonal_line.png";

const Hero = () => {
  return (
    <section className={styles.wrapper} id="join">
      <div className={styles.textContainer}>
        <h1 className={styles.heroText}>
          <span className={styles.circled}>
            Improve <span className={styles.circle}></span>
          </span>{" "}
          <span className={styles.soft}>Your Skill</span> <br />
          Anywhere
          <span className={styles.dots}>
            {" "}
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className={styles.soft}>and</span> <br />
          <img
            src={arrowRight}
            className={styles.arrow}
            alt="arrow-right"
          />{" "}
          <span className={styles.soft}>Anytime</span>
        </h1>
        <div className={styles.btnContainer}>
          <Link to={"/provider-sign-up"} className={styles.expert}>
            I'm an Expert
          </Link>
          <Link to={"/client-sign-up"} className={styles.client}>
            I Need Help
          </Link>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <img
          src={person}
          className={styles.heroImage}
          alt="person holding laptop"
        />
      </div>

      {/* --------Background Decoration------------- */}
      <img
        src={diagonalLine}
        className={styles.diagonalLine}
        alt="diagonal line"
      />
      <img
        src={leftArrow}
        className={styles.leftArrow}
        alt="left purple arrow"
      />
      <img
        src={purpleArrow}
        className={styles.purpleArrow}
        alt="purple arrow"
      />
    </section>
  );
};

export default Hero;
