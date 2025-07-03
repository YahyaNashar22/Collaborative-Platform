import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./DashboardHeader.module.css";

import logo from "../../assets/icons/logo_fullWhite.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const DashboardHeader = () => {
  const navigator = useNavigate();
  const { pathname } = useLocation();

  return (
    <header
      className={`${styles.wrapper} d-f align-center justify-start w-100`}
    >
      <img
        src={logo}
        width={167}
        height={65}
        alt="logo"
        onClick={() => navigator("/")}
      />
      <ul className={`${styles.navLinks} w-100 d-f align-center`}>
        {[
          { path: "/dashboard/projects", label: "Projects", hasIcon: false },
          { path: "/dashboard/requests", label: "Requests", hasIcon: false },
          { path: "/dashboard/proposals", label: "Proposals", hasIcon: false },
          { path: "/dashboard/services", label: "Services", hasIcon: false },
          { path: "/", label: "home", hasIcon: true },
        ].map(({ path, label, hasIcon }) => (
          <li
            key={path}
            className={`${styles.navLink} ${
              label === "Services" && styles.last
            } ${pathname === path ? styles.active : ""} pointer`}
          >
            <Link to={path} className="d-f align-center gap-2">
              {pathname.includes("/auth") ? (
                hasIcon && (
                  <div
                    className={`${styles.whiteHomeIcon} ${styles.homeIconContainer} d-f align-center`}
                  >
                    <FontAwesomeIcon
                      className={styles.homeIcon}
                      icon={faHouse}
                      size="lg"
                      style={{
                        color:
                          pathname.includes("/register") ||
                          pathname.includes("/login")
                            ? "#6550b4"
                            : "#ffffff",
                      }}
                    />
                    <span
                      className={styles.whiteIcon}
                      style={{
                        color:
                          pathname.includes("/register") ||
                          pathname.includes("/login")
                            ? "#495057"
                            : "#ffffff",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                )
              ) : (
                <div
                  className={`${styles.homeIconContainer}  d-f align-center`}
                >
                  {hasIcon && (
                    <FontAwesomeIcon
                      icon={faHouse}
                      size="lg"
                      style={{ color: "#6550b4" }}
                    />
                  )}
                  <span>{label}</span>
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default DashboardHeader;
