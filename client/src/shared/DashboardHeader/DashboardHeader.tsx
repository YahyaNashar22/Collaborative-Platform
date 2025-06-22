import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./DashboardHeader.module.css";

import logo from "../../assets/icons/logo.png";

const DashboardHeader = () => {
  const navigator = useNavigate();
  const location = useLocation();

  return (
    <header
      className={`${styles.wrapper} d-f align-center justify-start w-100`}
    >
      <img
        src={logo}
        width={80}
        height={64}
        alt="logo"
        onClick={() => navigator("/")}
      />
      <ul className={styles.navLinks}>
        <li
          className={`${styles.navLink} ${
            location.pathname === "/dashboard/active-projects"
              ? styles.active
              : ""
          } pointer`}
        >
          <Link to="/dashboard/active-projects">Active Projects</Link>
        </li>
        <li
          className={`${styles.navLink} ${
            location.pathname === "/dashboard/request-manager"
              ? styles.active
              : ""
          } pointer`}
        >
          <Link to="/dashboard/request-manager">Request Manager</Link>
        </li>
        {/* Only for Provider */}
        <li
          className={`${styles.navLink} ${
            location.pathname === "/dashboard/manage-services"
              ? styles.active
              : ""
          } pointer`}
        >
          <Link to="/dashboard/manage-services">Manage Services</Link>
        </li>
        {/* Only For Admin */}
        <li
          className={`${styles.navLink} ${
            location.pathname === "/dashboard/users-list" ? styles.active : ""
          } pointer`}
        >
          <Link to="/dashboard/users-list">Users List</Link>
        </li>
      </ul>
    </header>
  );
};

export default DashboardHeader;
