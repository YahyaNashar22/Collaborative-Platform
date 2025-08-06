import { jsx as _jsx } from "react/jsx-runtime";
import Dashboard from "../../../components/DashboadComponents/Dashboard/Dashboard";
import styles from "./DashboardPage.module.css";
const DashboardPage = () => {
    return (_jsx("div", { className: `${styles.wrapper} d-f w-100`, children: _jsx(Dashboard, {}) }));
};
export default DashboardPage;
