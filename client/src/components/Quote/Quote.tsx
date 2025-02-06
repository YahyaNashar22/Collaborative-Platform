import styles from "./Quote.module.css";

import logo from "../../assets/icons/logo_white.png";

const Quote = () => {
  return (
    <section className={styles.wrapper} id="quote">
      <img src={logo} className={styles.logo} alt="logo" />
      <p className={styles.quote}>
        MAKING A MEANINGFUL DIFFERENCE IS DEEPLY ROOTED IN OUR CORE, SERVING AS
        OUR APPROACH TO TACKLE THE MOST CRITICAL CHALLENGES.
      </p>
    </section>
  );
};

export default Quote;
