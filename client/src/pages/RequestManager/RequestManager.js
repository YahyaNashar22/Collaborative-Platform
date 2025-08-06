import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import EmptyDashboard from "../../components/homePage/EmptyDashboard/EmptyDashboard";
import styles from "./RequestManager.module.css";
const RequestManager = () => {
    const navigate = useNavigate();
    return (_jsxs("main", { className: styles.wrapper, children: [_jsx("section", { className: styles.titleSection, children: _jsx("h1", { className: styles.title, children: "Request Manager" }) }), _jsx(EmptyDashboard, { text: "Looks like you don't have any requests yet", buttonText: "Add Request", buttonAction: () => navigate("/dashboard/services") })] }));
};
export default RequestManager;
