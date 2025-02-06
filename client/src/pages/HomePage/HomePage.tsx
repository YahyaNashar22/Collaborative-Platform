import styles from "./HomePage.module.css";

import Hero from "../../components/Hero/Hero";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <Hero />
    </div>
  );
};

export default HomePage;
