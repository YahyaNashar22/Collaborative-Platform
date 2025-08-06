import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../shared/DashboardHeader/DashboardHeader";
const DashboardEntryLayout = () => {
    return (_jsxs(_Fragment, { children: [_jsx(DashboardHeader, {}), _jsx(Outlet, {})] }));
};
export default DashboardEntryLayout;
