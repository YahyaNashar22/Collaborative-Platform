import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import styles from "./PlanButtons.module.css";
const PlanButton = ({ step, onBack, onContinue, disabled, }) => {
    return step === 1 ? (_jsxs("div", { className: `${styles.btnsContainer} d-f align-center justify-between`, children: [_jsx(LibButton, { label: "Back", onSubmit: onBack, backgroundColor: "#57417e", hoverColor: "#49356a" }), _jsx(LibButton, { label: "Continue", onSubmit: onContinue, backgroundColor: "#57417e", hoverColor: "#49356a" })] })) : (_jsx(LibButton, { label: "Continue", onSubmit: onContinue, backgroundColor: "#57417e", hoverColor: "#49356a", disabled: disabled, padding: "0 30px" }));
};
export default PlanButton;
