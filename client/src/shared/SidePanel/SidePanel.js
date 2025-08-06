import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import styles from "./SidePanel.module.css";
import { Link, useLocation } from "react-router-dom";
import LibButton from "../../libs/common/lib-button/LibButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/icons/Logo.png";
const SidePanel = ({ isOpen, onClose, navItems, onLogin, isMainSidePanel = true, onSignup, }) => {
    const { pathname } = useLocation();
    const panelRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current &&
                event.target instanceof Node &&
                !panelRef.current.contains(event.target)) {
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
    return (_jsxs("div", { className: `${styles.wrapper} ${isOpen ? styles.open : ""}`, ref: panelRef, children: [_jsx("div", { className: styles.closeIcon, onClick: onClose, role: "button", tabIndex: 0, "aria-label": "Close side panel", children: _jsx(FontAwesomeIcon, { icon: faTimes, size: "lg" }) }), _jsx("div", { className: styles.logo, children: _jsx("img", { src: logo, alt: "logo" }) }), _jsx("ul", { className: `${styles.navLinks} d-f f-dir-col bold`, children: navItems.map(({ path, label }) => (_jsx("li", { className: `${styles.navLink} ${pathname === path ? styles.active : ""} pointer`, onClick: onClose, children: _jsx(Link, { to: path, children: label }) }, path))) }), isMainSidePanel && (_jsxs("div", { className: `${styles.buttons} d-f justify-between`, children: [_jsx(LibButton, { label: "LOG IN", backgroundColor: "#868788", hoverColor: "#6f7071", padding: "0 20px", onSubmit: onLogin }), _jsx(LibButton, { label: "SIGN UP", padding: "0 20px", onSubmit: onSignup })] }))] }));
};
export default SidePanel;
