import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./LibButton.module.css";
const LibButton = ({ label, disabled = false, outlined, backgroundColor, onSubmit, hoverColor, styleClass, padding, color, bold, }) => {
    return (_jsx("div", { className: `${styles.buttonWrapper} d-f justify-end align-center ${outlined ? styles.outlined : ""}`, children: _jsx("button", { type: "submit", className: `${styles.button} ${styleClass ? styles[styleClass] : ""} ${bold ? "bold" : ""} justify-center`, style: {
                backgroundColor: backgroundColor
                    ? backgroundColor
                    : outlined
                        ? "transparent"
                        : "#6550b4",
                ["--hover-bg"]: hoverColor ? hoverColor : "#563db1",
                padding: padding ? padding : "0 10px",
                color: color ? color : "white",
            }, onClick: onSubmit, disabled: disabled, children: label }) }));
};
export default LibButton;
