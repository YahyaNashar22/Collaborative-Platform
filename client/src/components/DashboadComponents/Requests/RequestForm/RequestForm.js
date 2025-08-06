import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./RequestForm.module.css";
import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import FileInput from "../../../../libs/common/lib-file-input/FileInput";
import TextAreaInput from "../../../../libs/common/lib-textArea/TextAreaInput";
import { Validate } from "../../../../utils/Validate";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import RequestDropdown from "./components/RequestDropdown";
const RequestForm = ({ moveBackward, onSubmit, data }) => {
    const [formValues, setFormValues] = useState({
        title: "",
        serviceId: "",
        description: "",
        document: null,
        offerDeadline: "",
        projectDeadline: "",
        budget: "",
    });
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        serviceId: "",
        document: "",
        offerDeadline: "",
        projectDeadline: "",
        budget: "",
    });
    const resetForm = () => {
        setFormValues({
            title: "",
            serviceId: "",
            description: "",
            document: null,
            offerDeadline: "",
            projectDeadline: "",
            budget: "",
        });
        setErrors({
            title: "",
            serviceId: "",
            description: "",
            document: "",
            offerDeadline: "",
            projectDeadline: "",
            budget: "",
        });
    };
    const handleChange = (name, value, isRequired, type) => {
        let customError = "";
        if ((name === "offerDeadline" || name === "projectDeadline") &&
            formValues.offerDeadline &&
            formValues.projectDeadline) {
            const offerDate = new Date(name === "offerDeadline" ? value : formValues.offerDeadline);
            const projectDate = new Date(name === "projectDeadline" ? value : formValues.projectDeadline);
            if (offerDate > projectDate) {
                customError =
                    "Offer deadline must be before or equal to project deadline.";
            }
        }
        const validationError = Validate(name, value, isRequired, type, type === "date");
        setErrors((prev) => ({
            ...prev,
            [name]: customError || validationError,
        }));
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = () => {
        let isValid = true;
        const newErrors = { ...errors };
        data.forEach((field) => {
            const value = formValues[field.name];
            const error = Validate(field.name, value, field.required ?? false, field.type, field.type === "date");
            newErrors[field.name] = error;
            if (error)
                isValid = false;
        });
        if (formValues.offerDeadline && formValues.projectDeadline) {
            const offerDate = new Date(formValues.offerDeadline);
            const projectDate = new Date(formValues.projectDeadline);
            if (offerDate > projectDate) {
                newErrors.offerDeadline =
                    "Offer deadline must be before or equal to project deadline.";
                newErrors.projectDeadline =
                    "Project deadline must be after or equal to offer deadline.";
                isValid = false;
            }
        }
        setErrors(newErrors);
        if (isValid) {
            onSubmit(formValues);
            resetForm();
        }
    };
    const handleSelectService = (selectedService) => {
        setFormValues((prev) => ({ ...prev, serviceId: selectedService }));
    };
    return (_jsxs("div", { className: styles.wrapper, children: [_jsx("div", { className: styles.header, children: _jsx("h1", { children: "Create New request" }) }), _jsx("form", { className: `${styles.form} d-f f-dir-col`, children: data.map((input, index) => {
                    if (input.type === "file") {
                        return (_jsx(FileInput, { ...input, value: formValues[input.name], onChange: (value, name) => handleChange(name, value, input.required, input.type), errorMessage: errors[input.name] }, index));
                    }
                    else if (input.type === "textarea") {
                        return (_jsx(TextAreaInput, { ...input, value: formValues[input.name], required: input.required ?? false, onChange: (value, name) => handleChange(name, value, input.required ?? false, input.type), errorMessage: errors[input.name] }, index));
                    }
                    else if (input.type === "searchableSelect") {
                        return (_jsxs("div", { className: `${styles.container} d-f f-wrap f-dir-col`, children: [_jsxs("label", { className: "bold", children: ["Pick a Service ", _jsx("span", { children: "*" })] }), _jsx("div", { className: "d-f f-wrap gap-05", children: _jsx(RequestDropdown, { emitSelectedService: handleSelectService }) }), errors.serviceId && (_jsx("small", { className: "error", children: "* This field is required" }))] }));
                    }
                    else {
                        return (_jsx(TextInput, { ...input, value: formValues[input.name], required: input.required ?? false, onChange: (value, name) => handleChange(name, value, input.required ?? false, input.type), errorMessage: errors[input.name] }, index));
                    }
                }) }), _jsxs("div", { className: `${styles.buttons} d-f align-center justify-end`, children: [_jsx(LibButton, { label: "Back", onSubmit: moveBackward, backgroundColor: "#57417e", hoverColor: "#49356a", padding: "0 20px" }), _jsx(LibButton, { label: "Submit", onSubmit: handleSubmit, backgroundColor: "#825beb", hoverColor: "#6c46d9", padding: "0 20px" })] })] }));
};
export default RequestForm;
