import styles from "./HomePage.module.css";

import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Quote from "../../components/Quote/Quote";
import Vision from "../../components/Vision/Vision";
import Strategy from "../../components/Strategy/Strategy";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <Hero />
      <About />
      <Quote />
      <Vision />
      <Strategy />
    </div>
  );
};

export default HomePage;
