import { ReactNode } from "react";
import styles from "./HeroWrapper.module.css";
type Props = {
  children: ReactNode;
  isAbout?: boolean;
};

const HeroWrapper: React.FC<Props> = ({ children, isAbout }) => {
  return (
    <section
      className={`${styles.wrapper} ${
        isAbout ? styles.isAbout : ""
      } d-f align-center justify-center w-100`}
      id="join"
    >
      {children}
    </section>
  );
};

export default HeroWrapper;
