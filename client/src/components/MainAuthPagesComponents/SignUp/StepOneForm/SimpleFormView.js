import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import styles from "./SimpleFormView.module.css";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import useFormStore from "../../../../store/FormsStore";
import { useStepFormHandlers } from "../../../../hooks/useStepFormHandlers";
import { getStringValue } from "../../../../utils/CastToString";
const SimpleFormView = ({ data, title, moveForward, error, }) => {
    const { role, type } = useFormStore();
    const { fieldValues, errors, handleChange, handleBlur, validateStep } = useStepFormHandlers(role, type);
    const onNext = () => {
        const hasError = validateStep(data.form);
        if (Object.keys(hasError).length > 0)
            return;
        moveForward();
    };
    return (_jsxs("div", { className: `${styles.formContainer} d-f f-dir-col`, children: [_jsx("h1", { className: "purple", children: title }), _jsxs("form", { className: `${styles.form} d-f f-dir-col `, children: [_jsx("div", { className: `${styles.firstRow} d-f w-100`, style: { gap: "20px" }, children: data.form.slice(0, 2).map((field, index) => (_jsx("div", { children: _jsx(TextInput, { label: field.label, type: field.type, placeholder: field.placeholder, name: field.name, value: fieldValues[field.name] || "", required: field.required || false, maxLength: Number(field.maxLength), minLength: Number(field.minLength), onChange: (value, name) => handleChange(name, value, field.required || false), errorMessage: errors[field.name], onBlur: () => handleBlur(field.name, getStringValue(fieldValues[field.name]), field.required || false, field.type) }) }, index))) }), data.form.slice(2).map((field, index) => (_jsx("div", { children: _jsx(TextInput, { label: field.label, type: field.type, placeholder: field.placeholder, name: field.name, value: fieldValues[field.name] || "", required: field.required || false, maxLength: Number(field.maxLength), minLength: Number(field.minLength), onChange: (value, name) => handleChange(name, value, field.required || false), errorMessage: errors[field.name], onBlur: () => handleBlur(field.name, getStringValue(fieldValues[field.name]), field.required || false, field.type) }) }, index)))] }), error && (_jsx("small", { className: "errorMsg d-f align-center error", children: error })), _jsx("div", { className: `${styles.buttons} d-f align-center justify-end`, children: _jsx(LibButton, { label: "Next", onSubmit: onNext, backgroundColor: "#825beb", hoverColor: " #6c46d9", padding: "0 20px" }) })] }));
};
export default SimpleFormView;
