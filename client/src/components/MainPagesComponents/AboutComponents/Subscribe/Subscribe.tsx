import styles from "./Subscribe.module.css";

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
    <section
      className={`${styles.wrapper} d-f align-center justify-center`}
      id="terms"
    >
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

        <button type="submit" className={`${styles.subscribeBtn} pointer`}>
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Subscribe;
