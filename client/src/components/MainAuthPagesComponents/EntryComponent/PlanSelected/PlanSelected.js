import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styles from "./PlanSelected.module.css";
const PlanSelected = ({ step, authSteps, role, }) => {
    return (_jsxs("div", { className: "d-f f-dir-col align-center", children: [_jsx("h1", { children: "Sign up" }), step === 1 && (_jsx(_Fragment, { children: _jsxs("small", { className: styles.details, children: ["BECOME A ", _jsx("span", { children: role.toUpperCase() }), _jsx("br", {}), " IN EASY ", authSteps, " STEPS"] }) }))] }));
};
export default PlanSelected;
