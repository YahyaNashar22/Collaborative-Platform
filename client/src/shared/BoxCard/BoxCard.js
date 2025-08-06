import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./BoxCard.module.css";
const BoxCard = ({ image, alt, title, status = "OPEN", providerName = "Provider name", duration, size, }) => {
    return (_jsxs("div", { className: `${styles.box} ${styles[size ?? "default"]}`, children: [_jsx("img", { src: image, width: size === "small" ? 300 : 350, height: size === "small" ? 300 : 350, className: styles.cardImg, alt: alt }), _jsxs("div", { className: styles.subBox, children: [_jsx("div", { className: styles.status, children: status }), _jsx("h1", { className: styles.boxTitle, children: title }), _jsx("div", { className: styles.subTitle, children: providerName }), _jsx("p", { className: "purple intense", children: duration })] })] }));
};
export default BoxCard;
