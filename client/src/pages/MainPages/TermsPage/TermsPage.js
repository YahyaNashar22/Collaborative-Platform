import { jsx as _jsx } from "react/jsx-runtime";
import Terms from "../../../components/MainPagesComponents/TermsComponents/Terms/Terms";
import styles from "./TermsPage.module.css";
const TermsPage = () => {
    return (_jsx("div", { className: `${styles.wrapper} container d-f f-dir-col justify-between`, children: _jsx(Terms, {}) }));
};
export default TermsPage;
