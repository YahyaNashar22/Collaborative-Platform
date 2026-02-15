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
import Window from "../../libs/common/lib-window/Window";
import LibButton from "../../libs/common/lib-button/LibButton";
import { useAuth } from "../../hooks/useAuth";
import { signOut } from "../../services/UserServices";
import authStore from "../../store/AuthStore";
import SidePanel from "../SidePanel/SidePanel";
import { toast } from "react-toastify";
import NotificationBell from "../NotificationBell/NotificationBell";
import { useTranslation } from "react-i18next";

const DashboardHeader = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [toggleWindow, setToggleWindow] = useState<boolean>(false);

  const { user } = useAuth();
  const { setUser, setLoading } = authStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isTwoLevelPath = () => pathname.split("/").filter(Boolean).length === 2;

  const navLinks = (() => {
    switch (user?.role) {
      case "admin":
        return [
          { path: "/dashboard", label: "Dashboard" },
          { path: "/dashboard/clients", label: "Clients" },
          { path: "/dashboard/providers", label: "Providers" },
          { path: "/dashboard/services", label: "Services" },
          { path: "/dashboard/projects", label: "Projects" },
          { path: "/dashboard/requests", label: "Requests" },
        ];
      case "client":
        return [
          { path: "/dashboard", label: "Dashboard" },
          { path: "/dashboard/projects", label: "Projects" },
          { path: "/dashboard/requests", label: "Requests" },
        ];
      case "provider":
        return [
          { path: "/dashboard", label: "Dashboard" },
          { path: "/dashboard/projects", label: "Projects" },
          { path: "/dashboard/requests", label: "Requests" },
        ];
      default:
        return [];
    }
  })();

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

  const onSignOut = () => setToggleWindow(true);

  const handleSignOut = async () => {
    try {
      const response = await signOut();
      if (response.status === 200) {
        setUser(null);
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      toast.error((error as any)?.data?.message || t("Error Occurred!"));
    }
  };

  return (
    <>
      <header
        className={`${styles.wrapper} d-f align-center justify-start w-100`}
      >
        <img
          src={logo}
          width={167}
          height={65}
          alt="logo"
          onClick={() => navigate("/")}
          className={`${styles.mainLogo} pointer`}
        />

        <ul className={`${styles.navLinks} w-100 d-f align-center`}>
          {!pathname.includes("profile") &&
            !pathname.includes("auth") &&
            navLinks.map(({ path, label }) => (
              <li
                key={path}
                className={`${styles.navLink} ${
                  pathname === path ? styles.active : ""
                } pointer`}
              >
                <Link to={path} className="d-f align-center gap-2">
                  <span>{t(label)}</span>
                </Link>
              </li>
            ))}

          {!pathname.includes("auth") ? (
            <li className={`${styles.navLink} ${styles.last} pointer`}>
              <div className={`${styles.homeIconContainer} d-f align-center`}>
                <NotificationBell />
                <Avatar
                  currentUser={{
                    firstName: user?.firstName ?? "",
                    lastName: user?.lastName ?? "",
                  }}
                  onClick={() => setToggleDropDown(!toggleDropDown)}
                />
              </div>
              <div
                className={styles.hamburger}
                onClick={() => setIsMobileNavOpen(true)}
              >
                <div className={`${styles.line} ${styles.top}`}></div>
                <div className={`${styles.line} ${styles.middle}`}></div>
                <div className={`${styles.line} ${styles.bottom}`}></div>
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
                    <Link to="profile">{t("View Profile")}</Link>
                  </div>
                  <div
                    className={`${styles.menuItem} ${styles.home} d-f align-center`}
                    onClick={() => setToggleDropDown(false)}
                  >
                    <FontAwesomeIcon icon={faHouse} className={styles.icon} />
                    <Link to="/">{t("Go Home")}</Link>
                  </div>
                  <div
                    className={`${styles.menuItem} ${styles.signOutItem} d-f align-center`}
                    onClick={() => {
                      setToggleDropDown(false);
                      onSignOut();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className={styles.icon}
                    />
                    <span>{t("Sign Out")}</span>
                  </div>
                </div>
              )}
            </li>
          ) : (
            <div className={`${styles.homeIcon} d-f justify-end w-100`}>
              <Link
                to="/"
                className={`${
                  isTwoLevelPath() ? styles.whiteHome : styles.PurpleHome
                } d-f align-baseline pointer`}
              >
                <FontAwesomeIcon icon={faHouse} className={styles.icon} />
                <span>{t("Home")}</span>
              </Link>
            </div>
          )}
        </ul>
      </header>

      {/* Side Panel Backdrop */}
      {isMobileNavOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsMobileNavOpen(false)}
        ></div>
      )}

      {/* Side Panel with dynamic links */}
      <SidePanel
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        navItems={navLinks}
        isMainSidePanel={false}
        onLogin={() => {
          navigate("/profile");
          setIsMobileNavOpen(false);
        }}
        onSignup={() => {
          setIsMobileNavOpen(false);
          onSignOut();
        }}
      />

      {/* Sign Out Confirmation Modal */}
      {toggleWindow && (
        <Window
          title={t("Sign Out")}
          onClose={() => setToggleWindow(false)}
          visible={toggleWindow}
        >
          <p>{t("Are you sure you want to sign out?")}</p>
          <div className={`${styles.buttons} d-f align-center justify-end`}>
            <LibButton
              label="Sign Out"
              onSubmit={handleSignOut}
              backgroundColor="var(--error)"
              hoverColor="#bb2d3b"
            />
          </div>
        </Window>
      )}
    </>
  );
};

export default DashboardHeader;
