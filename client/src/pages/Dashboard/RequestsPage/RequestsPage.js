import { jsx as _jsx } from "react/jsx-runtime";
import Requests from "../../../components/DashboadComponents/Requests/Requests";
import styles from "./RequestsPage.module.css";
const RequestsPage = () => {
    return (_jsx("div", { className: `${styles.wrapper} d-f w-100`, children: _jsx(Requests, {}) }));
};
export default RequestsPage;
