import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Window.module.css";
const Window = ({ visible, isErrorWindow, title, size = "normal", children, onClose, }) => {
    if (!visible)
        return null;
    return (_jsxs("div", { className: styles.dialog, tabIndex: 0, autoFocus: true, role: "dialog", "aria-modal": true, "aria-labelledby": "modal-title", children: [_jsx("div", { className: styles.blackMask }), _jsxs("div", { className: `${styles.window} ${size === "large" ? styles.lg : ""} ${size === "full" ? styles.full : ""}`, children: [_jsxs("div", { className: `${styles.header}  ${title == null ? styles.end : ""}`, children: [title && (_jsx("div", { className: `${styles.title} bold ${isErrorWindow ? styles.errorWindow : "purple"}`, children: title })), _jsx("div", { className: `${styles.closeIcon}`, onClick: onClose, children: "\u00D7" })] }), _jsx("div", { className: styles.content, children: children })] })] }));
};
export default Window;
