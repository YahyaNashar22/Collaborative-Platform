import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./EmptyDashboard.module.css";
import person from "../../assets/icons/person.png";
const EmptyDashboard = ({ text, buttonText, buttonAction, }) => {
    return (_jsxs("section", { className: `${styles.wrapper} d-f align-center justify-center f-dir-col`, children: [_jsx("img", { src: person, width: 128, height: 128, loading: "lazy" }), _jsx("h2", { children: text }), _jsx("button", { type: "button", onClick: buttonAction, className: "pointer", children: buttonText })] }));
};
export default EmptyDashboard;
