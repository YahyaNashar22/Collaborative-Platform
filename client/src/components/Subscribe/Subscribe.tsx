import styles from "./Subscribe.module.css";

import left from "../../assets/icons/left_subscribe.png";
import right from "../../assets/icons/right_subscribe.png";
import down from "../../assets/icons/down_subscribe.png";
import diagonal from "../../assets/icons/diagonal_subscribe.png";
import { ChangeEvent, FormEvent, useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState<string>();

  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmail("");
    // implement this if the client adds newsletter service
  }
  return (
    <section className={styles.wrapper} id="subscribe">
      <h2 className={styles.title}>
        WE'RE DELIVERING THE BEST <br /> CUSTOMER EXPERIENCE
      </h2>
      <form className={styles.subscribeContainer} onSubmit={handleSubmit}>
        <input
          type="email"
          className={styles.subscribeInput}
          placeholder="Enter your email"
          value={email}
          onChange={handleEmail}
        />

        <button type="submit" className={styles.subscribeBtn}>
          Subscribe
        </button>
      </form>

      {/* -----------Bg Styles ----------- */}
      <img src={left} className={styles.left} alt="left arrow" />
      <img src={right} className={styles.right} alt="right arrow" />
      <img src={down} className={styles.down} alt="down arrow" />
      <img src={diagonal} className={styles.diagonal} alt="diagonal arrow" />
    </section>
  );
};

export default Subscribe;
