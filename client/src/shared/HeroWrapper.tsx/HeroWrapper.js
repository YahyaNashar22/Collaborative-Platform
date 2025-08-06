import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./HeroWrapper.module.css";
const HeroWrapper = ({ children, isAbout }) => {
    return (_jsx("section", { className: `${styles.wrapper} ${isAbout ? styles.isAbout : ""} d-f align-center justify-center w-100`, id: "join", children: children }));
};
export default HeroWrapper;
