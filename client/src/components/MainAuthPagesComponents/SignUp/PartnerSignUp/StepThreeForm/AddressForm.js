import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LibButton from "../../../../../libs/common/lib-button/LibButton";
import TextInput from "../../../../../libs/common/lib-text-input/TextInput";
import styles from "./AddressForm.module.css";
import useFormStore from "../../../../../store/FormsStore";
import { useStepFormHandlers } from "../../../../../hooks/useStepFormHandlers";
import { getStringValue } from "../../../../../utils/CastToString";
const AddressForm = ({ data, title, moveForward, moveBackward, }) => {
    const { role, type } = useFormStore();
    const { fieldValues, errors, handleChange, handleBlur, validateStep } = useStepFormHandlers(role, type);
    const onNext = () => {
        const validationErrors = validateStep(data.form);
        if (Object.keys(validationErrors).length > 0)
            return;
        moveForward();
    };
    return (_jsxs("div", { className: `${styles.formContainer} d-f f-dir-col`, children: [_jsx("h1", { className: "purple", children: title }), _jsx("form", { className: `${styles.form} d-f f-dir-col `, children: data.form.map((field, index) => (_jsx("div", { children: _jsx(TextInput, { label: field.label, type: field.type, placeholder: field.placeholder, name: field.name, value: getStringValue(fieldValues[field.name]), required: field.required || false, minLength: Number(field.minLength), onChange: (value, name) => handleChange(name, value, field.required || false), errorMessage: errors[field.name], onBlur: () => handleBlur(field.name, getStringValue(fieldValues[field.name]), field.required || false, field.type) }) }, index))) }), _jsxs("div", { className: `${styles.buttons} d-f align-center justify-end`, children: [_jsx(LibButton, { label: "Back", onSubmit: moveBackward, backgroundColor: "#57417e", hoverColor: "#49356a", padding: "0 20px" }), _jsx(LibButton, { label: "Next", onSubmit: onNext, backgroundColor: "#825beb", hoverColor: "#6c46d9", padding: "0 20px" })] })] }));
};
export default AddressForm;
