import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../shared/DashboardHeader/DashboardHeader";
import DashboardSide from "../shared/DashboardSide/DashboardSide";
import vector from "../assets/icons/bottomIcon.png";
import styles from "./DashboardSideLayout.module.css";
const DashboardSideLayout = () => {
    return (_jsxs(_Fragment, { children: [_jsx(DashboardHeader, {}), _jsxs("div", { className: `${styles.wrapper} d-f w-100 justify-between`, children: [_jsx(DashboardSide, {}), _jsx("div", { className: styles.container, children: _jsx(Outlet, {}) }), _jsx("div", { className: `${styles.rightLogo} d-f align-end`, children: _jsx("img", { src: vector, alt: "logo" }) })] })] }));
};
export default DashboardSideLayout;
