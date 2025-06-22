import styles from "./About.module.css";

const About = () => {
  return (
    <section className="d-f align-center justify-center">
      <main className={`${styles.wrapper} d-f f-dir-col `}>
        <h1 className={styles.header}>
          <span className="purple">TAKATUF</span>{" "}
          <span className="bold">
            IS A PLATFORM DEDICATED TO CONNECTING CLIENTS
          </span>{" "}
          <span className="thin">WITH CONSULTANCY SERVICE</span>
        </h1>
        <small className="align-text">
          providers across various fields, including financial, managerial,
          marketing, information technology, and digital consulting. We offer
          innovative solutions that assist businesses and individuals in Saudi
          Arabia to access high-quality global expertise at competitive prices.
          Our platform also enables international companies to enter the Saudi
          market and build a strong customer base that supports their expansion
          and future investments, aligning with the Kingdom's Vision 2030 to
          promote innovation and attract both startups and global enterprises.
        </small>
      </main>
    </section>
  );
};

export default About;
