import styles from "./HomePage.module.css";

import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <Hero />
      <About />
    </div>
  );
};

export default HomePage;
