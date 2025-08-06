import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { registerFormData } from "../../../data/registerFormData";
import LibButton from "../../../libs/common/lib-button/LibButton";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./AddressData.module.css";
import { Validate } from "../../../utils/Validate";
const AddressData = ({ userData, onCancel, onSave, isViewer = false, }) => {
    const [updatedData, setUpdatedData] = useState({});
    const [errors, setErrors] = useState({});
    const fields = registerFormData.roles.provider.types.default.formData[2].form;
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
    return (_jsxs("div", { className: `${styles.formContainer} d-f f-dir-col`, children: [_jsx("form", { className: `${styles.form} d-f f-dir-col `, children: fields.map((field, index) => (_jsx("div", { children: _jsx(TextInput, { label: field.label, type: field.type, placeholder: field.placeholder, name: field.name, value: updatedData[field.name] ?? userData[field.name] ?? "", required: field.required || false, minLength: Number(field.minLength), onChange: (value, name) => handleChange(name, value, field.required || false, field.type), errorMessage: errors[field.name], disabled: isViewer }) }, index))) }), !isViewer && (_jsxs("div", { className: `${styles.buttons} d-f align-center justify-between`, children: [_jsx(LibButton, { label: "Cancel", onSubmit: onCancel, outlined: true, color: "var(--deep-purple)", hoverColor: "#8563c326", padding: "0" }), _jsx(LibButton, { label: "Next", onSubmit: handleSave, backgroundColor: "#825beb", hoverColor: "#6c46d9", padding: "0" })] }))] }));
};
export default AddressData;
