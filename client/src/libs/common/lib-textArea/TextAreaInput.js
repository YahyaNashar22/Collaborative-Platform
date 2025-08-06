import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./TextAreaInput.module.css";
const TextAreaInput = ({ label, placeholder, name, required, value, disabled = false, onChange, errorMessage, maxLength = 1000, onBlur, }) => {
    return (_jsxs("div", { className: `${styles.inputContainer} ${errorMessage ? styles.error : ""}  d-f f-dir-col`, children: [_jsx("label", { htmlFor: name, className: "bold", children: _jsxs("span", { children: [label, " ", required && _jsx("span", { className: styles.required, children: "*" })] }) }), _jsxs("div", { className: `${styles.inputHolder} ${disabled ? styles.disabled : ""} d-f align-center ${errorMessage ? styles.error : ""}`, children: [_jsx("textarea", { required: required, name: name, id: name, value: value, disabled: disabled, placeholder: placeholder, rows: 4, cols: 50, maxLength: maxLength, onChange: (e) => onChange(e.target.value, name), onBlur: onBlur }), _jsxs("div", { className: styles.length, children: [value?.length, " / ", maxLength] })] }), errorMessage && _jsx("small", { className: "error", children: errorMessage })] }));
};
export default TextAreaInput;
