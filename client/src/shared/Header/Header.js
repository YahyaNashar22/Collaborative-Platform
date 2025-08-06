import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/icons/Logo.png";
import Window from "../../libs/common/lib-window/Window";
import { faBriefcase, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LibButton from "../../libs/common/lib-button/LibButton";
import SidePanel from "../SidePanel/SidePanel";
import Avatar from "../Avatar/Avatar";
const Header = ({ user }) => {
    const navigator = useNavigate();
    const { pathname } = useLocation();
    const [onWindowOpen, setOnWindowOpen] = useState(false);
    const [nextRoute, setNextRoute] = useState("");
    const [isDarkNav, setIsDarkNav] = useState(false);
    const navigate = useNavigate();
    const cardData = [
        {
            icon: faBriefcase,
            title: "Become A Partner",
            description: "a provider to deliver services through our platform",
            type: "provider",
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
            if (window.scrollY > window.innerHeight / 2 - 50) {
                setIsDarkNav(true);
            }
            else {
                setIsDarkNav(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isDarkNav]);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsSidePanelOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const openAuthWindow = (type) => {
        setNextRoute(type);
        setOnWindowOpen(true);
        closeSidePanel();
    };
    const handleClick = (type) => {
        switch (type) {
            case "provider":
                if (nextRoute === "register")
                    navigator(`auth/${type}`);
                else
                    navigator(`auth/${type}/${nextRoute}`);
                break;
            case "client":
                if (nextRoute === "register")
                    navigator(`auth/${type}`);
                else
                    navigator(`auth/${type}/${nextRoute}`);
                break;
            default:
                break;
        }
    };
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const toggleSidePanel = () => setIsSidePanelOpen((prev) => !prev);
    const closeSidePanel = () => setIsSidePanelOpen(false);
    const navItems = [
        { path: "/", label: "HOME" },
        { path: "/about", label: "ABOUT US" },
        { path: "/FAQ", label: "FAQ" },
        { path: "/terms", label: "TERMS" },
        { path: "/contact", label: "CONTACT US" },
    ];
    return (_jsxs(_Fragment, { children: [isSidePanelOpen && (_jsx("div", { className: styles.backdrop, onClick: closeSidePanel })), _jsx(SidePanel, { isOpen: isSidePanelOpen, onClose: () => setIsSidePanelOpen(false), logoSrc: logo, navItems: navItems, showButtons: true, onLogin: () => openAuthWindow("login"), onSignup: () => openAuthWindow("register") }), _jsxs("header", { className: `${styles.wrapper} d-f align-center justify-between ${isDarkNav ? styles.dark : ""}`, children: [_jsxs("div", { className: `${styles.left}`, children: [_jsx("img", { src: logo, alt: "logo", onClick: () => navigator("/") }), _jsx("ul", { className: `${styles.navLinks} ${isSidePanelOpen ? styles.showMenu : ""}`, children: [
                                    { path: "/", label: "HOME" },
                                    { path: "/about", label: "ABOUT US" },
                                    { path: "/market_place", label: "MARKET PLACE" },
                                    { path: "/FAQ", label: "FAQ" },
                                    { path: "/terms", label: "TERMS" },
                                    { path: "/contact", label: "CONTACT US" },
                                ].map(({ path, label }) => (_jsx("li", { className: `${styles.navLink}  ${pathname === path ? styles.active : ""} pointer`, children: _jsx(Link, { to: path, children: label }) }, path))) })] }), _jsx("div", { className: styles.right, children: user ? (_jsx(Avatar, { currentUser: {
                                firstName: user?.firstName,
                                lastName: user?.lastName,
                            }, onClick: () => navigate("/dashboard") })) : (_jsxs(_Fragment, { children: [_jsx(LibButton, { label: "LOG IN", backgroundColor: "#868788", hoverColor: "#6f7071", onSubmit: () => openAuthWindow("login") }), _jsx(LibButton, { label: "SIGN UP", onSubmit: () => openAuthWindow("register") })] })) }), _jsxs("div", { className: styles.hamburger, onClick: toggleSidePanel, children: [_jsx("div", { className: `${styles.line} ${styles.top}` }), _jsx("div", { className: `${styles.line} ${styles.middle}` }), _jsx("div", { className: `${styles.line} ${styles.bottom}` })] })] }), onWindowOpen && (_jsx(Window, { visible: onWindowOpen, onClose: () => setOnWindowOpen(false), size: "large", children: _jsxs("div", { className: `${styles.windowContainer} d-f f-dir-col align-center justify-center`, children: [_jsxs("div", { className: `${styles.header} d-f f-dir-col align-center`, children: [_jsx("h1", { className: `${styles.title} purple`, children: "LET'S GET STARTED" }), _jsx("p", { className: `${styles.description} bold`, children: "Choose how you like to join us" })] }), _jsx("main", { className: `${styles.boxContainer} d-f w-100`, children: cardData.map((card, index) => (_jsxs("article", { className: `${index === 0 ? styles.leftBox : styles.rightBox} d-f f-dir-col align-center`, children: [_jsx(FontAwesomeIcon, { icon: card.icon, size: "2xl", style: { color: "#ffffff" } }), _jsx("h1", { children: nextRoute === "login" && card.type === "provider"
                                            ? "Log In As Partner"
                                            : nextRoute === "login" && card.type === "client"
                                                ? "Log In As Client"
                                                : card.title }), _jsx("p", { children: card.description }), _jsx("div", { className: styles.btn, children: _jsx(LibButton, { label: `${nextRoute === "register" ? "JOIN US" : "SIGN IN"}`, outlined: true, onSubmit: () => handleClick(card.type), styleClass: "rounded" }) })] }, card.type))) })] }) }))] }));
};
export default Header;
