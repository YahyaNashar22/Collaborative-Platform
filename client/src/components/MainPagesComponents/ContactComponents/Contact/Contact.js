import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Contact.module.css";
import map from "../../../../assets/images/map.png";
import ContactForm from "../ContactForm/ContactForm";
const Contact = () => {
    return (_jsxs("div", { className: `${styles.wrapper} d-f `, children: [_jsx("div", { className: styles.left, children: _jsx("img", { src: map, alt: "map", width: 500, height: 665 }) }), _jsx("div", { className: "w-100", children: _jsx(ContactForm, {}) })] }));
};
export default Contact;
