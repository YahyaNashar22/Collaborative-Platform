import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./ProgressBar.module.css";
const ProgressBar = ({ nodes, currentNode }) => {
    return (_jsx("div", { className: `${styles.wrapper} d-f align-center`, children: Array.from({ length: nodes }).map((_, index) => (_jsx("span", { className: index === currentNode ? styles.selected : "" }, index))) }));
};
export default ProgressBar;
