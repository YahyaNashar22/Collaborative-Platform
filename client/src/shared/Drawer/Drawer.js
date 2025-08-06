import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Drawer.module.css";
const Drawer = ({ title, visible, onClose, children }) => {
    if (!visible)
        return null;
    return (_jsx("div", { className: styles.drawerOverlay, children: _jsxs("div", { className: styles.drawer, children: [_jsxs("div", { className: styles.header, children: [title && _jsx("h3", { className: styles.title, children: title }), _jsx("button", { className: styles.closeButton, onClick: onClose, children: "\u00D7" })] }), _jsx("div", { className: styles.body, children: children })] }) }));
};
export default Drawer;
