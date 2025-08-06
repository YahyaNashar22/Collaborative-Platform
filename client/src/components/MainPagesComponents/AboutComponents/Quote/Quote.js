import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Quote.module.css";
import logo from "../../../../assets/icons/logo_white.png";
const Quote = () => {
    return (_jsxs("section", { className: `${styles.wrapper} d-f align-center justify-center w-100 `, id: "quote", children: [_jsx("img", { src: logo, className: styles.logo, alt: "logo" }), _jsx("p", { className: `align-text ${styles.quote}`, children: "MAKING A MEANINGFUL DIFFERENCE IS DEEPLY ROOTED IN OUR CORE, SERVING AS OUR APPROACH TO TACKLE THE MOST CRITICAL CHALLENGES." })] }));
};
export default Quote;
