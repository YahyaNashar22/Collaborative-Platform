import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./LoginComponent.module.css";
import { Validate } from "../../../utils/Validate";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import LibButton from "../../../libs/common/lib-button/LibButton";
const LogInComponent = ({ onLogin, onForgetPassword, children, }) => {
    const [formValues, setFormValues] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [errors, setErrors] = useState({});
    const data = [
        {
            name: "email",
            label: "Email",
            value: "",
            placeholder: "Email",
            type: "email",
            maxLength: 30,
            required: true,
            errorMsg: "* This Field is Required",
        },
        {
            name: "password",
            label: "password",
            value: "",
            placeholder: "password",
            type: "password",
            maxLength: 30,
            minLength: 5,
            required: true,
            errorMsg: "* This Field is Required",
        },
    ];
    const onSubmit = () => {
        const hasError = onNextValidation();
        if (Object.keys(hasError).length > 0)
            return;
        onLogin(formValues);
    };
    const onNextValidation = () => {
        const newErrors = {};
        const newTouched = {};
        data.forEach((field) => {
            const value = formValues[field.name] || "";
            const error = Validate(field.name, value, field.required, field.type);
            if (error) {
                newErrors[field.name] = error;
                newTouched[field.name] = true;
            }
        });
        setErrors(newErrors);
        setTouchedFields((prev) => ({ ...prev, ...newTouched }));
        return newErrors;
    };
    const handleChange = (name, value, required) => {
        setFormValues((prev) => ({ ...prev, [name]: value }));
        if (touchedFields[name]) {
            const error = Validate(name, value, required, data.find((f) => f.name === name)?.type || "");
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };
    const handleBlur = (name, value, required, type) => {
        setTouchedFields((prev) => ({ ...prev, [name]: true }));
        const error = Validate(name, value, required, type);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };
    return (_jsx("div", { className: styles.wrapper, children: _jsx("div", { className: "d-f f-dir-col", children: _jsxs("div", { className: `${styles.formContainer} d-f f-dir-col`, children: [_jsx("form", { className: `${styles.form} d-f f-dir-col`, children: data.map((field, index) => {
                            return (_jsx("div", { children: _jsx(TextInput, { label: field.label, type: field.type, placeholder: field.placeholder, name: field.name, value: formValues[field.name] || "", required: field.required, maxLength: field.maxLength, minLength: field.minLength, onChange: (value, name) => handleChange(name, value, field.required), errorMessage: errors[field.name], onBlur: () => handleBlur(field.name, formValues[field.name] || "", field.required, field.type) }) }, index));
                        }) }), children, _jsxs("div", { className: `${styles.buttons} d-f align-center justify-between`, children: [_jsx("small", { className: "purple pointer bold", onClick: onForgetPassword, children: "Forgot password?" }), _jsx(LibButton, { label: "Sign In", onSubmit: onSubmit, backgroundColor: "#825beb", hoverColor: "#6c46d9", padding: "0 20px" })] })] }) }) }));
};
export default LogInComponent;
