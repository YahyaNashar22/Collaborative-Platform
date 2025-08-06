import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./FileInput.module.css";
const FileInput = ({ label, name, required = false, errorMessage, onChange, onBlur, placeholder, value, }) => {
    const [fileName, setFileName] = useState("");
    const inputRef = useRef(null);
    useEffect(() => {
        if (value) {
            setFileName(value.name);
        }
        else {
            setFileName("");
        }
    }, [value]);
    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setFileName(file?.name || "");
        onChange(file, name);
    };
    return (_jsxs("div", { className: `${styles.inputContainer} d-f f-dir-col`, children: [_jsxs("label", { htmlFor: name, className: "bold", children: [label, " ", required && _jsx("span", { className: styles.required, children: "*" })] }), _jsx("div", { className: `${styles.fileWrapper} ${errorMessage ? styles.error : ""}`, children: _jsxs("div", { className: `${styles.inputHolder} d-f align-center`, children: [_jsxs("label", { htmlFor: name, className: `${styles.customFileLabel} d-f w-100 align-center pointer bold`, children: [_jsx(FontAwesomeIcon, { icon: faFolderPlus, size: "xl", color: "#495057" }), _jsx("span", { className: styles.placeholderText, children: fileName || placeholder })] }), _jsx("input", { type: "file", id: name, name: name, ref: inputRef, className: styles.hiddenInput, required: required, onChange: handleFileChange, onBlur: onBlur })] }) }), errorMessage && _jsx("small", { className: "error", children: errorMessage })] }));
};
export default FileInput;
