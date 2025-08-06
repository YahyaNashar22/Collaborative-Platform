import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styles from "./TextInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faMagnifyingGlass, } from "@fortawesome/free-solid-svg-icons";
import "react-international-phone/style.css";
import { getStringValue } from "../../../utils/CastToString";
import { useState } from "react";
import PhoneTextInput from "../lib-phoneNumber-input/PhoneTextInput";
const TextInput = ({ type, label, placeholder, name, value, required, maxLength, minLength, onChange, disabled = false, errorMessage, onBlur, min, max, hasCurrency = false, hasIcon = false, }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };
    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;
    return (_jsxs("div", { className: `${styles.inputContainer} ${name === "search_projects" ? styles.search_inputContainer : ""} d-f f-dir-col`, children: [_jsx("label", { htmlFor: name, className: "bold", children: _jsxs("span", { children: [label, " ", required && _jsx("span", { className: styles.required, children: "*" })] }) }), _jsxs("div", { className: "d-f align-center", children: [_jsxs("div", { className: `${styles.inputHolder}  ${errorMessage ? styles.error : ""} ${name === "phone" ? styles.phoneInput : ""} ${disabled ? styles.disabled : ""} d-f align-center`, children: [name === "phone" ? (_jsx(PhoneTextInput, { name: name, disabled: disabled, defaultCountry: "lb", value: getStringValue(value), required: required, onChange: onChange, onBlur: onBlur })) : (_jsxs(_Fragment, { children: [_jsx("input", { type: inputType, id: name, placeholder: placeholder, disabled: disabled, name: name, value: type === "number" ? Number(value) : getStringValue(value), required: required, maxLength: maxLength, minLength: minLength || 0, ...(type === "number" ? { min } : {}), ...(type === "number" ? { max } : {}), onChange: (e) => onChange(e.target.value, name), onBlur: onBlur }), hasIcon && (_jsx(FontAwesomeIcon, { icon: faMagnifyingGlass, style: { color: "#757575" } }))] })), type === "password" && (_jsx("div", { className: "pointer", onClick: handleTogglePassword, children: showPassword ? (_jsx(FontAwesomeIcon, { icon: faEyeSlash, style: { color: "#495059" } })) : (_jsx(FontAwesomeIcon, { icon: faEye, style: { color: "#495059" } })) }))] }), hasCurrency && (_jsx("div", { className: `${styles.currencySymbol} d-f align-center justify-center intense`, children: "USD" }))] }), errorMessage && _jsx("small", { className: "error", children: errorMessage })] }));
};
export default TextInput;
