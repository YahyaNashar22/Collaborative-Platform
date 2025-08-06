import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./ContactForm.module.css";
import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import TextAreaInput from "../../../../libs/common/lib-textArea/TextAreaInput";
import LibButton from "../../../../libs/common/lib-button/LibButton";
const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        description: "",
    });
    const formInputs = [
        {
            label: "First Name",
            placeholder: "First Name",
            name: "firstName",
            value: "",
            type: "text",
            required: true,
        },
        {
            label: "Last Name",
            placeholder: "Last Name",
            name: "lastName",
            value: "",
            type: "text",
            required: true,
        },
        {
            label: "Email Address",
            placeholder: "Email Address",
            name: "email",
            type: "email",
            value: "",
            required: true,
        },
        {
            label: "Phone Number",
            placeholder: "Phone Number",
            name: "phoneNumber",
            type: "text",
            value: "",
            required: true,
        },
    ];
    const handleChange = (name, value) => {
        const updatedFormData = {
            ...formData,
            [name]: value,
        };
        setFormData(updatedFormData);
        const hasError = checkingValidation(updatedFormData);
    };
    const checkingValidation = (data) => {
        return Object.entries(data).some(([key, value]) => {
            if (key.toLowerCase().includes("email")) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(value);
            }
            return value.trim().length === 0;
        });
    };
    const handleCLick = () => {
        return;
    };
    return (_jsx("div", { className: `${styles.wrapper} d-f f-dir-col w-100`, children: _jsxs("div", { className: `${styles.formWrapper} d-f f-dir-col align-start`, children: [_jsxs("div", { className: "w-100", children: [_jsx("h1", { className: "title", children: "Get in Touch" }), _jsx("small", { className: styles.description, children: "Fill up the form our team will get back to you within 24 Hours" })] }), _jsxs("form", { className: `${styles.form} d-f f-dir-col w-100`, children: [_jsx("div", { className: `${styles.firstRow} d-f w-100`, children: formInputs.slice(0, 2).map((elem, index) => (_jsx(TextInput, { label: elem.label, type: elem.type, value: formData[elem.name], placeholder: elem.placeholder, name: elem.name, required: elem.required, onChange: (value, name) => handleChange(name, value) }, index))) }), formInputs.slice(2).map((elem, index) => (_jsx(TextInput, { label: elem.label, type: elem.type, value: formData[elem.name], placeholder: elem.placeholder, name: elem.name, required: elem.required, onChange: (value, name) => handleChange(name, value) }, index + 2))), _jsx(TextAreaInput, { label: "Description", placeholder: "Type here...", name: "description", required: true, value: formData.description, onChange: (value, name) => handleChange(name, value) }), _jsx(LibButton, { label: "Submit", onSubmit: handleCLick })] })] }) }));
};
export default ContactForm;
