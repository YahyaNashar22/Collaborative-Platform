import { useEffect, useRef } from "react";
import styles from "./SidePanel.module.css";
import logo from "../../assets/icons/Logo.png";
import { Link, useLocation } from "react-router-dom";
import LibButton from "../../libs/common/lib-button/LibButton";

interface sidePanelType {
  isOpen: boolean;
  onClose: () => void;
  openAuthWindow: (route: string) => void;
}

const SidePanel = ({ isOpen, onClose, openAuthWindow }: sidePanelType) => {
  const { pathname } = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        event.target instanceof Node &&
        !panelRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  return (
    <div
      className={`${styles.wrapper} ${isOpen ? styles.open : ""}`}
      ref={panelRef}
    >
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>

      <ul className={`${styles.navLinks} d-f f-dir-col bold`}>
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
              pathname === path ? styles.active : ""
            } pointer`}
            onClick={onClose}
          >
            <Link to={path}>{label}</Link>
          </li>
        ))}
      </ul>
      <div className={`${styles.buttons} d-f justify-between`}>
        <LibButton
          label="LOG IN"
          backgroundColor="#868788"
          hoverColor="#6f7071"
          padding="0 20px"
          onSubmit={() => openAuthWindow("login")}
        ></LibButton>

        <LibButton
          label="SIGN UP"
          padding="0 20px"
          onSubmit={() => openAuthWindow("register")}
        ></LibButton>
      </div>
    </div>
  );
};

export default SidePanel;
