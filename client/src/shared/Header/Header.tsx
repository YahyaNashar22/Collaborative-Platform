import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/icons/Logo.png";
import hamburg from "../../assets/icons/menu-icon.png";
import Window from "../../libs/common/lib-window/Window";
import { faBriefcase, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import LibButton from "../../libs/common/lib-button/LibButton";
import SidePanel from "../SidePanel/SidePanel";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "../Avatar/Avatar";

interface cardDataType {
  icon: IconDefinition;
  title: string;
  description: string;
  type: string;
}

const Header = () => {
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const [onWindowOpen, setOnWindowOpen] = useState<boolean>(false);
  const [nextRoute, setNextRoute] = useState<string>("");
  const [isDarkNav, setIsDarkNav] = useState<boolean>(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const cardData: cardDataType[] = [
    {
      icon: faBriefcase,
      title: "Become A Partner",
      description: "a partner to deliver services through our platform",
      type: "partner",
    },
    {
      icon: faCircleUser,
      title: "Become A Client",
      description: "a client to benefit from our expert services",
      type: "client",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2 - 400) {
        setIsDarkNav(true);
      } else {
        setIsDarkNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDarkNav]);

  useEffect(() => {
    console.log(user);
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidePanelOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openAuthWindow = (type: string) => {
    setNextRoute(type);
    setOnWindowOpen(true);
    closeSidePanel();
  };

  const handleClick = (type: string) => {
    switch (type) {
      case "partner":
        if (nextRoute === "register") navigator(`auth/${type}`);
        else navigator(`auth/${type}/${nextRoute}`);
        break;
      case "client":
        if (nextRoute === "register") navigator(`auth/${type}`);
        else navigator(`auth/${type}/${nextRoute}`);
        break;
      default:
        break;
    }
  };

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const toggleSidePanel = () => setIsSidePanelOpen((prev) => !prev);
  const closeSidePanel = () => setIsSidePanelOpen(false);

  return (
    <>
      {/* Backdrop */}
      {isSidePanelOpen && (
        <div className={styles.backdrop} onClick={closeSidePanel}></div>
      )}
      <SidePanel
        isOpen={isSidePanelOpen}
        onClose={toggleSidePanel}
        openAuthWindow={(type) => openAuthWindow(type)}
      />
      <header
        className={`${styles.wrapper} d-f align-center justify-between ${
          isDarkNav ? styles.dark : ""
        }`}
      >
        <div className={`${styles.left}`}>
          <img src={logo} alt="logo" onClick={() => navigator("/")} />

          {/* Nav Links */}
          <ul className={`${styles.navLinks}`}>
            {[
              { path: "/", label: "HOME" },
              { path: "/about", label: "ABOUT US" },
              { path: "/market_place", label: "MARKET PLACE" },
              { path: "/FAQ", label: "FAQ" },
              { path: "/terms", label: "TERMS" },
              { path: "/contact", label: "CONTACT US" },
            ].map(({ path, label }) => (
              <li
                key={path}
                className={`${styles.navLink}  ${
                  pathname === path ? styles.active : ""
                } pointer`}
              >
                <Link to={path}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.right}>
          {user ? (
            <Avatar
              currentUser={{
                firstName: user?.firstName,
                lastName: user?.lastName,
              }}
              onClick={() => navigate("/dashboard")}
            />
          ) : (
            <>
              <LibButton
                label="LOG IN"
                backgroundColor="#868788"
                hoverColor="#6f7071"
                onSubmit={() => openAuthWindow("login")}
              ></LibButton>
              <LibButton
                label="SIGN UP"
                onSubmit={() => openAuthWindow("register")}
              ></LibButton>
            </>
          )}
        </div>

        {/* Hamburger button */}
        <button className={styles.hamburger} onClick={toggleSidePanel}>
          <img width={40} src={hamburg} alt="hamburg menu" />
        </button>
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
              {cardData.map((card, index) => (
                <article
                  key={card.type}
                  className={`${
                    index === 0 ? styles.leftBox : styles.rightBox
                  } d-f f-dir-col align-center`}
                >
                  <FontAwesomeIcon
                    icon={card.icon}
                    size="2xl"
                    style={{ color: "#ffffff" }}
                  />

                  <h1>
                    {nextRoute === "login" && card.type === "partner"
                      ? "Log In As Partner"
                      : nextRoute === "login" && card.type === "client"
                      ? "Log In As Client"
                      : card.title}
                  </h1>
                  <p>{card.description}</p>

                  <div className={styles.btn}>
                    <LibButton
                      label={`${
                        nextRoute === "register" ? "JOIN US" : "SIGN IN"
                      }`}
                      outlined={true}
                      onSubmit={() => handleClick(card.type)}
                      styleClass="rounded"
                    />
                  </div>
                </article>
              ))}
            </main>
          </div>
        </Window>
      )}
    </>
  );
};

export default Header;
