import { useEffect, useRef } from "react";
import styles from "./SidePanel.module.css";
import { Link, useLocation } from "react-router-dom";
import LibButton from "../../libs/common/lib-button/LibButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/icons/Logo.png";
interface NavItem {
  path: string;
  label: string;
}

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  isMainSidePanel?: boolean;
  onLogin: () => void;
  onSignup: () => void;
}

const SidePanel = ({
  isOpen,
  onClose,
  navItems,
  onLogin,
  isMainSidePanel = true,
  onSignup,
}: SidePanelProps) => {
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
      {/* Close Icon */}
      <div
        className={styles.closeIcon}
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close side panel"
      >
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </div>

      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>

      <ul className={`${styles.navLinks} d-f f-dir-col bold`}>
        {navItems.map(({ path, label }) => (
          <li
            key={path}
            className={`${styles.navLink} ${
              pathname === path ? styles.active : ""
            } pointer`}
            onClick={onClose}
          >
            <Link to={path}>{label}</Link>
          </li>
        ))}
      </ul>

      {isMainSidePanel && (
        <div className={`${styles.buttons} d-f justify-between`}>
          <LibButton
            label="LOG IN"
            backgroundColor="#868788"
            hoverColor="#6f7071"
            padding="0 20px"
            onSubmit={onLogin}
          />
          <LibButton label="SIGN UP" padding="0 20px" onSubmit={onSignup} />
        </div>
      )}
    </div>
  );
};

export default SidePanel;
