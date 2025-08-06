import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { registerFormData } from "../../../data/registerFormData";
import styles from "./RequiredDocuments.module.css";
import FileInput from "../../../libs/common/lib-file-input/FileInput";
import { downloadFile } from "../../../services/FileUpload";
import { Validate } from "../../../utils/Validate";
import { useState } from "react";
import LibButton from "../../../libs/common/lib-button/LibButton";
const RequiredDocuments = ({ userData, onCancel, onSave, }) => {
    const [updatedData, setUpdatedData] = useState({});
    const [errors, setErrors] = useState({});
    const fields = registerFormData.roles.provider.types.default.formData[4].form;
    const handleChange = (name, value, required, type) => {
        if (value === userData[name]) {
            setUpdatedData((prev) => {
                const newData = { ...prev };
                delete newData[name];
                return newData;
            });
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
            return;
        }
        console.log(name, value);
        setUpdatedData((prev) => ({ ...prev, [name]: value }));
        const error = Validate(name, value, required, type);
        setErrors((prev) => {
            const newErrors = { ...prev };
            if (error)
                newErrors[name] = error;
            else
                delete newErrors[name];
            return newErrors;
        });
    };
    const handleSave = () => {
        console.log("errors: ", errors);
        console.log(updatedData);
        if (Object.keys(errors).length === 0)
            onSave(updatedData);
    };
    return (_jsxs("div", { className: `${styles.formContainer} d-f f-dir-col`, children: [_jsx("form", { children: fields.map((field, index) => (_jsxs("div", { children: [_jsx(FileInput, { name: field.name, label: field.label, value: updatedData[field.name] ||
                                userData[field.name] ||
                                "", placeholder: field.placeholder, required: field.required || false, onChange: (value, name) => handleChange(name, value, field.required || false, field.type), errorMessage: errors[field.name] }), _jsxs("li", { className: styles.uploadedItem, children: [_jsx("div", { className: styles.fileDetails, children: _jsx("span", { className: styles.fileName, children: userData[field.name] || "No File Uploaded" }) }), _jsx("div", { className: `${styles.downloadLink} pointer`, rel: "noopener noreferrer", onClick: (e) => {
                                        e.stopPropagation();
                                        downloadFile(userData[field.name]);
                                    }, children: "\u2B07 Download" })] })] }, index))) }), _jsxs("div", { className: `${styles.buttons} d-f align-center justify-between`, children: [_jsx(LibButton, { label: "Cancel", onSubmit: onCancel, outlined: true, color: "var(--deep-purple)", hoverColor: "#8563c326", padding: "0" }), _jsx(LibButton, { label: "Next", onSubmit: handleSave, backgroundColor: "#825beb", hoverColor: "#6c46d9", padding: "0" })] })] }));
};
export default RequiredDocuments;
