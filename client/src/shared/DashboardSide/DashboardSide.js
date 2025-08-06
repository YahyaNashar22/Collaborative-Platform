import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./DashboardSide.module.css";
import { useState } from "react";
import Window from "../../libs/common/lib-window/Window";
import LibButton from "../../libs/common/lib-button/LibButton";
import authStore from "../../store/AuthStore";
import { signOut } from "../../services/UserServices";
import { toast } from "react-toastify";
const DashboardSide = () => {
    const navigate = useNavigate();
    const [openSignOutWindow, setOpenSignOutWindow] = useState(false);
    const { pathname } = useLocation();
    const { setUser, setLoading } = authStore();
    const handleSignOut = async () => {
        try {
            const response = await signOut();
            if (response.status === 200) {
                setUser(null);
                setLoading(false);
            }
            {
                navigate("/");
            }
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
    };
    const getLinkTo = () => {
        if (pathname.includes("dashboard")) {
            return (_jsx("div", { onClick: () => setOpenSignOutWindow(true), className: `${styles.redirectBtn} pointer`, children: "Sign Out" }));
        }
        else if (pathname.includes("register")) {
            return (_jsx(Link, { to: "login", relative: "path", className: `${styles.redirectBtn} pointer`, children: "Log in" }));
        }
        else if (pathname.includes("login")) {
            return (_jsx(Link, { to: "register", relative: "path", className: `${styles.redirectBtn} pointer`, children: "Sign up" }));
        }
        else {
            return null;
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: `${styles.wrapper} d-f f-dir-col align-start justify-between`, children: [_jsx("p", { children: "TAKATUP IS A PLATFORM DEDICATED TO CONNECTING CLIENTS WITH CONSULTANCY SERVICE PROVIDERS" }), _jsxs("div", { className: "d-f f-dir-col align-start", children: [getLinkTo(), _jsx(Link, { to: "/contact", className: `${styles.redirectBtn} pointer`, children: "Having troubles? Get Help" })] })] }), _jsxs(Window, { title: "Sign Out", onClose: () => setOpenSignOutWindow(false), visible: openSignOutWindow, children: [_jsx("p", { children: "Are you sure you want to sign out?" }), _jsx("div", { className: `${styles.buttons} d-f align-center justify-end`, children: _jsx(LibButton, { label: "Sign Out", onSubmit: handleSignOut, backgroundColor: "var(--error)", hoverColor: "#bb2d3b" }) })] })] }));
};
export default DashboardSide;
