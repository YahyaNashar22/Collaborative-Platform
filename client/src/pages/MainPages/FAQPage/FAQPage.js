import { jsx as _jsx } from "react/jsx-runtime";
import FAQ from "../../../components/MainPagesComponents/FAQComponents/FAQ/FAQ";
import styles from "./FAQPage.module.css";
const FAQPage = () => {
    return (_jsx("div", { className: `${styles.wrapper} container d-f f-dir-col justify-between`, children: _jsx(FAQ, {}) }));
};
export default FAQPage;
