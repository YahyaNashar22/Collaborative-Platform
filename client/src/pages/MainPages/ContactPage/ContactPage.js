import { jsx as _jsx } from "react/jsx-runtime";
import Contact from "../../../components/MainPagesComponents/ContactComponents/Contact/Contact";
import styles from "./ContactPage.module.css";
const ContactPage = () => {
    return (_jsx("div", { className: `${styles.wrapper} container d-f f-dir-col justify-between`, children: _jsx(Contact, {}) }));
};
export default ContactPage;
