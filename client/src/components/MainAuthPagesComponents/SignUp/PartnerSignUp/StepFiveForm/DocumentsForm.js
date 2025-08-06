import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useFormStore from "../../../../../store/FormsStore";
import { useStepFormHandlers } from "../../../../../hooks/useStepFormHandlers";
import FileInput from "../../../../../libs/common/lib-file-input/FileInput";
import LibButton from "../../../../../libs/common/lib-button/LibButton";
import styles from "./DocumentsForm.module.css";
const DocumentsForm = ({ data, title, moveForward, moveBackward, }) => {
    const { role, type } = useFormStore();
    const { fieldValues, errors, handleChange, handleBlur, validateStep } = useStepFormHandlers(role, type);
    const onNext = () => {
        const hasError = validateStep(data.form);
        if (Object.keys(hasError).length > 0)
            return;
        moveForward();
    };
    return (_jsxs("div", { className: `${styles.formContainer} d-f f-dir-col`, children: [_jsx("h1", { className: "purple", children: title }), _jsxs("form", { className: `${styles.form} d-f f-dir-col`, children: [_jsx("div", { className: `${styles.firstRow} d-f w-100`, style: { gap: "20px" }, children: data.form.slice(0, 2).map((field, index) => (_jsx("div", { children: _jsx(FileInput, { name: field.name, label: field.label, value: fieldValues[field.name], placeholder: field.placeholder, required: field.required || false, onChange: (value, name) => handleChange(name, value, field.required || false), errorMessage: errors[field.name], onBlur: () => handleBlur(field.name, fieldValues[field.name] || "", field.required || false, field.type) }) }, index))) }), data.form.slice(2).map((field, index) => (_jsx("div", { children: _jsx(FileInput, { label: field.label, placeholder: field.placeholder, name: field.name, value: fieldValues[field.name], required: field.required || false, maxLength: Number(field.maxLength), minLength: Number(field.minLength), onChange: (value, name) => handleChange(name, value, field.required || false), errorMessage: errors[field.name], onBlur: () => handleBlur(field.name, fieldValues[field.name] || "", field.required || false, field.type) }) }, index)))] }), _jsxs("div", { className: `${styles.buttons} d-f align-center justify-end`, children: [_jsx(LibButton, { label: "Back", onSubmit: moveBackward, backgroundColor: "#57417e", hoverColor: "#49356a", padding: "0 20px" }), _jsx(LibButton, { label: "Next", onSubmit: onNext, backgroundColor: "#825beb", hoverColor: "#6c46d9", padding: "0 20px" })] })] }));
};
export default DocumentsForm;
