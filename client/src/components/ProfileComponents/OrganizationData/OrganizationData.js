import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./OrganizationData.module.css";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import LibButton from "../../../libs/common/lib-button/LibButton";
import { registerFormData } from "../../../data/registerFormData";
import TextAreaInput from "../../../libs/common/lib-textArea/TextAreaInput";
import SelectInput from "../../../libs/common/lib-select-input/SelectInput";
import FileInput from "../../../libs/common/lib-file-input/FileInput";
import { Validate } from "../../../utils/Validate";
import { downloadFile } from "../../../services/FileUpload";
const fields = registerFormData.roles.client.types.company.formData[1].form;
const OrganizationData = ({ userData, onCancel, onSave, isViewer = false, }) => {
    const [updatedData, setUpdatedData] = useState({});
    const [errors, setErrors] = useState({});
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
    console.log(userData, "-=-=-=-=-=-=-=-=-=-=");
    return (_jsxs("div", { className: styles.companyDataTab, children: [_jsxs("form", { className: `${styles.form} d-f f-dir-col `, children: [fields.slice(0, 3).map((field, index) => {
                        return (_jsx("div", { children: field.type === "aria" ? (_jsx(TextAreaInput, { label: field.label, placeholder: field.placeholder, name: field.name, value: updatedData[field.name] ?? userData[field.name] ?? "", required: field.required || false, onChange: (value, name) => handleChange(name, value, field.required || false, field.type), disabled: isViewer })) : (_jsx(TextInput, { label: field.label, type: field.type, placeholder: field.placeholder, name: field.name, value: updatedData[field.name] ?? userData[field.name] ?? "", required: field.required || false, maxLength: Number(field.maxLength), minLength: Number(field.minLength), min: Number(field.minLength), onChange: (value, name) => handleChange(name, value, field.required || false, field.type), errorMessage: errors[field.name], disabled: isViewer })) }, index));
                    }), _jsx("div", { className: `${styles.firstRow} d-f w-100`, style: { gap: "20px" }, children: fields.slice(3, 5).map((field, index) => (_jsx("div", { style: { flex: 1 }, children: _jsx(SelectInput, { label: field.label, name: field.name, type: field.type, value: updatedData[field.name] ?? userData[field.name] ?? "", required: field.required, placeholder: field.placeholder, options: field.options || [], onChange: (value, name) => handleChange(field.name, value, field.required || false, field.type), errorMessage: errors[field.name], disabled: isViewer }) }, index))) }), fields.slice(5).map((field, index) => {
                        return (_jsxs("div", { children: [_jsx(FileInput, { label: field.label, placeholder: field.placeholder, name: field.name, value: updatedData[field.name] ?? userData[field.name] ?? "", required: field.required || false, onChange: (value) => handleChange(field.name, value, field.required || false, field.type), errorMessage: errors[field.name], disabled: isViewer }), _jsxs("li", { className: styles.uploadedItem, children: [_jsx("div", { className: styles.fileDetails, children: _jsx("span", { className: styles.fileName, children: userData[field.name] || "No File Uploaded" }) }), _jsx("div", { className: `${styles.downloadLink} pointer`, rel: "noopener noreferrer", onClick: (e) => {
                                                e.stopPropagation();
                                                downloadFile(userData[field.name]);
                                            }, children: "\u2B07 Download" })] })] }, index));
                    })] }), !isViewer && (_jsxs("div", { className: `${styles.buttons} d-f align-center justify-between`, children: [_jsx(LibButton, { label: "Cancel", onSubmit: onCancel, outlined: true, color: "var(--deep-purple)", hoverColor: "#8563c326", padding: "0" }), _jsx(LibButton, { label: "Save", onSubmit: handleSave, padding: "0" })] }))] }));
};
export default OrganizationData;
