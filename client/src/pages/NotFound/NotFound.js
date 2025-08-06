import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
const NotFound = () => {
    const navigate = useNavigate();
    return (_jsx("main", { className: styles.wrapper, children: _jsxs("div", { className: styles.content, children: [_jsx("h1", { className: styles.title, children: "404" }), _jsx("h2", { className: styles.subtitle, children: "Page Not Found" }), _jsx("p", { className: styles.description, children: "The page you're looking for doesn't exist or has been moved." }), _jsx("button", { onClick: () => navigate("/"), className: `${styles.button} pointer`, children: "Go Home" })] }) }));
};
export default NotFound;
