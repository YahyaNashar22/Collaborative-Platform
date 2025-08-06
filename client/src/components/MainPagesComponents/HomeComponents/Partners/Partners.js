import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Partners.module.css";
const Partners = () => {
    return (_jsxs("section", { className: `${styles.wrapper} d-f f-dir-col`, children: [_jsx("h1", { className: styles.title, children: "OUR PARTNERS" }), _jsx("div", { className: "d-f align-center justify-center", children: Array.from({ length: 4 }).map((_, index) => (_jsx("div", { className: "intense purple", children: "LOGO" }, index))) })] }));
};
export default Partners;
