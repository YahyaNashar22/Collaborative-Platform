import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import styles from "./ActiveProjects.module.css";
import EmptyDashboard from "../../shared/EmptyDashboard/EmptyDashboard";
const ActiveProjects = () => {
    const navigate = useNavigate();
    return (_jsxs("main", { className: `${styles.wrapper} d-f align-center justify-center f-dir-center`, children: [_jsxs("h1", { className: styles.welcome, children: ["Welcome Back ", _jsx("span", { className: "purple", children: "Full Name" })] }), _jsx(EmptyDashboard, { text: "Looks like you haven't subscribed to any services yet", buttonText: "Subscribe Now", buttonAction: () => navigate("/dashboard/services") })] }));
};
export default ActiveProjects;
