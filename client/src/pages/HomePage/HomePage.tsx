import styles from "./HomePage.module.css";

import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Quote from "../../components/Quote/Quote";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <Hero />
      <About />
      <Quote />
    </div>
  );
};

export default HomePage;
