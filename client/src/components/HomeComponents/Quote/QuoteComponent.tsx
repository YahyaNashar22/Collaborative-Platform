import styles from "./QuoteComponent.module.css";

const Quote = () => {
  return (
    <section className={`${styles.wrapper} `} id="quote">
      <div
        className={`${styles.quoteContainer} d-f align-center justify-center w-100 f-dir-col w-100`}
      >
        <h1 className={styles.header}>HOW IT WORKS</h1>
        <p className={`align-text ${styles.quote}`}>
          Takatuf is a dynamic platform that connects partners to provide their
          services to the clients, enabling buyers to electronically submit
          purchase requests. These requests are then distributed to a vast
          network of authorized SMEs across Saudi Arabia, ensuring efficient
          procurement and seamless business transactions.
        </p>
      </div>
    </section>
  );
};

export default Quote;
