import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import styles from "./ForgetPasswordComponent.module.css";
import { Validate } from "../../../../utils/Validate";
const ForgetPasswordComponent = ({ moveBackward, onReset, }) => {
    const [formValues, setFormValues] = useState({
        email: "",
    });
    const [touchedFields, setTouchedFields] = useState({});
    const [errors, setErrors] = useState("");
    const handleChange = (name, value, required) => {
        setFormValues((prev) => ({ ...prev, [name]: value }));
        if (touchedFields[name]) {
            const error = Validate(name, value, required, "email");
            setErrors(error);
        }
    };
    const handleBlur = (name, value, required, type) => {
        setTouchedFields((prev) => ({ ...prev, [name]: true }));
        const error = Validate(name, value, required, type);
        setErrors(error);
    };
    const emitEmail = () => {
        const error = Validate("email", formValues.email, true, "email");
        if (error) {
            setErrors(error);
            return;
        }
        onReset(formValues.email);
    };
    return (_jsx("div", { className: styles.wrapper, children: _jsx("div", { className: "d-f f-dir-col", children: _jsxs("div", { className: `${styles.formContainer} d-f f-dir-col`, children: [_jsx("form", { className: `${styles.form} d-f f-dir-col`, children: _jsx("div", { children: _jsx(TextInput, { label: "Email Address", type: "email", placeholder: "Email Address", name: "email", value: formValues.email, required: true, maxLength: 30, minLength: 10, onChange: (value, name) => handleChange(name, value, true), errorMessage: errors, onBlur: () => handleBlur("email", formValues.email || "", true, "email") }) }) }), _jsxs("div", { className: `${styles.buttons} d-f align-center justify-end`, children: [_jsx(LibButton, { label: "Back", onSubmit: moveBackward, backgroundColor: "#57417e", hoverColor: "#49356a", padding: "0 35.7px" }), _jsx(LibButton, { label: "Reset Password", onSubmit: emitEmail, backgroundColor: "#825beb", hoverColor: "#6c46d9", padding: "0 20px" })] })] }) }) }));
};
export default ForgetPasswordComponent;
