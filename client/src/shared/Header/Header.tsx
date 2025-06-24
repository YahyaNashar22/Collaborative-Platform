import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/icons/Logo.png";
import Window from "../../libs/common/lib-window/Window";
import { faBriefcase, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LibButton from "../../libs/common/lib-button/LibButton";

const Header = () => {
  const navigator = useNavigate();
  const currentPath = useLocation().pathname;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [onWindowOpen, setOnWindowOpen] = useState<boolean>(false);
  const [nextRoute, setNextRoute] = useState<string>("");
  const [isDarkNav, setIsDarkNav] = useState<boolean>(false);

  const navigate = useNavigate();

  const openAuthWindow = (type: string) => {
    setNextRoute(type);
    setOnWindowOpen(true);
  };

  const handleClick = () => {
    if (nextRoute === "sign-up") navigate(`/auth`);
    else navigate(`auth/${nextRoute}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsDarkNav(true);
      } else {
        setIsDarkNav(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`${styles.wrapper} d-f align-center justify-between ${
          isDarkNav ? "dark" : ""
        }`}
      >
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
            className={`${styles.navLinks} ${
              isMenuOpen ? styles.showMenu : ""
            }`}
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
          <LibButton
            label="LOG IN"
            disabled={false}
            backgroundColor="#868788"
            hoverColor="#6f7071"
            onSubmit={() => openAuthWindow("login")}
          ></LibButton>

          <LibButton
            label="SIGN UP"
            disabled={false}
            onSubmit={() => openAuthWindow("sign-up")}
          ></LibButton>
        </div>
      </header>
      {onWindowOpen && (
        <Window
          visible={onWindowOpen}
          onClose={() => setOnWindowOpen(false)}
          size="large"
        >
          <div
            className={`${styles.windowContainer} d-f f-dir-col align-center justify-center`}
          >
            <div className={`${styles.header} d-f f-dir-col align-center`}>
              <h1 className={`${styles.title} purple`}>LET'S GET STARTED</h1>
              <p className={`${styles.description} bold`}>
                Choose how you \d like to join us
              </p>
            </div>
            <main className={`${styles.boxContainer} d-f w-100`}>
              <article
                className={`${styles.leftBox} d-f f-dir-col align-center`}
              >
                <FontAwesomeIcon
                  icon={faBriefcase}
                  size="2xl"
                  style={{ color: "#ffffff" }}
                />

                <h1>Become A Partner</h1>
                <p>a partner to deliver services through our platform</p>

                <div className={styles.btn}>
                  <LibButton
                    label="JOIN US"
                    disabled={false}
                    outlined={true}
                    onSubmit={handleClick}
                    styleClass="rounded"
                  ></LibButton>
                </div>
              </article>
              <article
                className={`${styles.rightBox} d-f f-dir-col align-center`}
              >
                <FontAwesomeIcon
                  icon={faCircleUser}
                  size="2xl"
                  style={{ color: "#ffffff" }}
                />
                <h1>Become A Client</h1>
                <p>a client to benefit from our expert services</p>
                <div className={styles.btn}>
                  <LibButton
                    label="JOIN US"
                    disabled={false}
                    outlined={true}
                    onSubmit={handleClick}
                    styleClass="rounded"
                  ></LibButton>
                </div>
              </article>
            </main>
          </div>
        </Window>
      )}
    </>
  );
};

export default Header;
