import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import styles from "./DashboardHeader.module.css";
import logo from "../../assets/icons/logo_fullWhite.png";
import Avatar from "../Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const DashboardHeader = () => {
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/dashboard/projects", label: "Projects" },
    { path: "/dashboard/requests", label: "Requests" },
    { path: "/dashboard/users", label: "Users" },
    { path: "/dashboard/services", label: "Services" },
  ];

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setToggleDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        className="pointer"
      />

      <ul className={`${styles.navLinks} w-100 d-f align-center`}>
        {/* in the profile page remove the navbar */}
        {!pathname.includes("profile") &&
          !pathname.includes("auth") &&
          links.map(({ path, label }) => (
            <li
              key={path}
              className={`${styles.navLink} ${
                label === "Services" ? styles.last : ""
              } ${pathname === path ? styles.active : ""} pointer`}
            >
              <Link to={path} className="d-f align-center gap-2">
                <span>{label}</span>
              </Link>
            </li>
          ))}

        {/* Avatar at the end */}
        {!pathname.includes("auth") && (
          <li className={`${styles.navLink} ${styles.last} pointer`}>
            <div className={`${styles.homeIconContainer} d-f align-center`}>
              <Avatar
                currentUser={{
                  firstName: "abdel rahman",
                  lastName: "Ghannoum",
                }}
                onClick={() => setToggleDropDown(!toggleDropDown)}
              />
            </div>
            {toggleDropDown && (
              <div className={styles.dropdownMenu} ref={dropdownRef}>
                <div
                  className={`${styles.menuItem} ${styles.profile} d-f align-center`}
                  onClick={() => setToggleDropDown(false)}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className={styles.profileIcon}
                  />
                  <Link to={"profile"}>View Profile</Link>
                </div>
                <div
                  className={`${styles.menuItem} ${styles.home} d-f align-center`}
                  onClick={() => setToggleDropDown(false)}
                >
                  <FontAwesomeIcon icon={faHouse} className={styles.icon} />
                  <Link to={"/"}>Go Home</Link>
                </div>
                <div
                  className={`${styles.menuItem} ${styles.signOutItem} d-f align-center`}
                  onClick={() => setToggleDropDown(false)}
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className={styles.icon}
                  />
                  <span>Sign Out</span>
                </div>
              </div>
            )}
          </li>
        )}
      </ul>
    </header>
  );
};

export default DashboardHeader;
