
import { useNavigate } from "react-router-dom";

import styles from "./Header.module.css";

import logo from "../../assets/icons/Logo.png";


const Header = () => {
  const navigator = useNavigate();


  return (
    <header className={styles.wrapper}>
      <div className={styles.left} onClick={() => navigator("/")}>
        <img src={logo} width={80} height={64} alt="logo" />
        <ul className={styles.navLinks}>
          <li className={styles.navLink}>
            <a href="#join">Join</a>
          </li>
          <li className={styles.navLink}>
            <a href="#about">About</a>
          </li>
          <li className={styles.navLink}>
            <a href="#vision">Vision</a>
          </li>
          <li className={styles.navLink}>
            <a href="#strategy">Strategy</a>
          </li>
          <li className={styles.navLink}>
            <a href="#subscribe">Subscribe</a>
          </li>
        </ul>
      </div>

      <div className={styles.phoneHelp}>
        <p className={styles.helpText}>Need help? Talk to an expert</p>
        <a className={styles.phone} href="https://wa.me/+966541041901">
          00 966 54 104 1901
        </a>
      </div>
    </header>
  );
};

export default Header;
