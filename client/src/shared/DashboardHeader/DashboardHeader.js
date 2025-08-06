import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styles from "./DashboardHeader.module.css";
import logo from "../../assets/icons/logo_fullWhite.png";
import Avatar from "../Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRightFromBracket, faUser, } from "@fortawesome/free-solid-svg-icons";
import Window from "../../libs/common/lib-window/Window";
import LibButton from "../../libs/common/lib-button/LibButton";
import { useAuth } from "../../hooks/useAuth";
import { signOut } from "../../services/UserServices";
import authStore from "../../store/AuthStore";
import SidePanel from "../SidePanel/SidePanel";
import { toast } from "react-toastify";
const DashboardHeader = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [toggleDropDown, setToggleDropDown] = useState(false);
    const [toggleWindow, setToggleWindow] = useState(false);
    const { user } = useAuth();
    const { setUser, setLoading } = authStore();
    const dropdownRef = useRef(null);
    const isTwoLevelPath = () => pathname.split("/").filter(Boolean).length === 2;
    const navLinks = (() => {
        switch (user?.role) {
            case "admin":
                return [
                    { path: "/dashboard", label: "Dashboard" },
                    { path: "/dashboard/users", label: "Users" },
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
        const handleClickOutside = (event) => {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target)) {
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
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: `${styles.wrapper} d-f align-center justify-start w-100`, children: [_jsx("img", { src: logo, width: 167, height: 65, alt: "logo", onClick: () => navigate("/"), className: `${styles.mainLogo} pointer` }), _jsxs("ul", { className: `${styles.navLinks} w-100 d-f align-center`, children: [!pathname.includes("profile") &&
                                !pathname.includes("auth") &&
                                navLinks.map(({ path, label }) => (_jsx("li", { className: `${styles.navLink} ${pathname === path ? styles.active : ""} pointer`, children: _jsx(Link, { to: path, className: "d-f align-center gap-2", children: _jsx("span", { children: label }) }) }, path))), !pathname.includes("auth") ? (_jsxs("li", { className: `${styles.navLink} ${styles.last} pointer`, children: [_jsx("div", { className: `${styles.homeIconContainer} d-f align-center`, children: _jsx(Avatar, { currentUser: {
                                                firstName: user?.firstName ?? "",
                                                lastName: user?.lastName ?? "",
                                            }, onClick: () => setToggleDropDown(!toggleDropDown) }) }), _jsxs("div", { className: styles.hamburger, onClick: () => setIsMobileNavOpen(true), children: [_jsx("div", { className: `${styles.line} ${styles.top}` }), _jsx("div", { className: `${styles.line} ${styles.middle}` }), _jsx("div", { className: `${styles.line} ${styles.bottom}` })] }), toggleDropDown && (_jsxs("div", { className: styles.dropdownMenu, ref: dropdownRef, children: [_jsxs("div", { className: `${styles.menuItem} ${styles.profile} d-f align-center`, onClick: () => setToggleDropDown(false), children: [_jsx(FontAwesomeIcon, { icon: faUser, className: styles.profileIcon }), _jsx(Link, { to: "profile", children: "View Profile" })] }), _jsxs("div", { className: `${styles.menuItem} ${styles.home} d-f align-center`, onClick: () => setToggleDropDown(false), children: [_jsx(FontAwesomeIcon, { icon: faHouse, className: styles.icon }), _jsx(Link, { to: "/", children: "Go Home" })] }), _jsxs("div", { className: `${styles.menuItem} ${styles.signOutItem} d-f align-center`, onClick: () => {
                                                    setToggleDropDown(false);
                                                    onSignOut();
                                                }, children: [_jsx(FontAwesomeIcon, { icon: faRightFromBracket, className: styles.icon }), _jsx("span", { children: "Sign Out" })] })] }))] })) : (_jsx("div", { className: `${styles.homeIcon} d-f justify-end w-100`, children: _jsxs(Link, { to: "/", className: `${isTwoLevelPath() ? styles.whiteHome : styles.PurpleHome} d-f align-baseline pointer`, children: [_jsx(FontAwesomeIcon, { icon: faHouse, className: styles.icon }), _jsx("span", { children: "Home" })] }) }))] })] }), isMobileNavOpen && (_jsx("div", { className: styles.backdrop, onClick: () => setIsMobileNavOpen(false) })), _jsx(SidePanel, { isOpen: isMobileNavOpen, onClose: () => setIsMobileNavOpen(false), navItems: navLinks, isMainSidePanel: false, onLogin: () => {
                    navigate("/profile");
                    setIsMobileNavOpen(false);
                }, onSignup: () => {
                    setIsMobileNavOpen(false);
                    onSignOut();
                } }), toggleWindow && (_jsxs(Window, { title: "Sign Out", onClose: () => setToggleWindow(false), visible: toggleWindow, children: [_jsx("p", { children: "Are you sure you want to sign out?" }), _jsx("div", { className: `${styles.buttons} d-f align-center justify-end`, children: _jsx(LibButton, { label: "Sign Out", onSubmit: handleSignOut, backgroundColor: "var(--error)", hoverColor: "#bb2d3b" }) })] }))] }));
};
export default DashboardHeader;
