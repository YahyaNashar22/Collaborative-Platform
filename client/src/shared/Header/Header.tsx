import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/icons/Logo.png";

const Header = () => {
  const navigator = useNavigate();
  const currentPath = useLocation().pathname;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className={`${styles.wrapper} d-f align-center justify-between`}>
      <div className={`${styles.left}`}>
        <img src={logo} alt="logo" onClick={() => navigator("/")} />

        {/* Hamburger button */}
        <button
          className={styles.hamburger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        {/* Nav Links */}
        <ul
          className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ""}`}
        >
          {[
            { path: "/", label: "HOME" },
            { path: "/about", label: "ABOUT US" },
            { path: "/FAQ", label: "FAQ" },
            { path: "/terms", label: "TERMS" },
            { path: "/contact", label: "CONTACT US" },
          ].map(({ path, label }) => (
            <li
              key={path}
              className={`${styles.navLink}  ${
                currentPath === path ? styles.active : ""
              } pointer`}
            >
              <Link to={path}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.right}>
        <Link to="/login" className={`${styles.login} pointer`}>
          SIGN IN
        </Link>
        <Link to="/login" className={`${styles.signup} pointer`}>
          SIGN UP
        </Link>
      </div>
    </header>
  );
};

export default Header;
