import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import TextAreaInput from "../../../../libs/common/lib-textArea/TextAreaInput";
import styles from "./ServiceForm.module.css";
const ServiceForm = ({ onBack, emitCreateService, error, }) => {
    const [requestForm, setRequestForm] = useState({
        name: "",
        description: "",
    });
    const handleCreateService = () => {
        emitCreateService(requestForm);
        setRequestForm({ name: "", description: "" });
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.header, children: _jsx("h1", { children: "Create New Service" }) }), _jsxs("form", { children: [_jsx(TextInput, { name: "name", label: "Title", type: "string", placeholder: "Enter title", required: false, value: requestForm["name"], onChange: (value) => setRequestForm((prev) => ({
                            ...prev,
                            name: value,
                        })) }), _jsx(TextAreaInput, { name: "description", label: "Description", placeholder: "Enter description", required: false, value: requestForm["description"], onChange: (value) => setRequestForm((prev) => ({
                            ...prev,
                            description: value,
                        })) })] }), error && (_jsx("small", { className: "errorMsg d-f align-center error", children: error })), _jsxs("div", { className: `${styles.buttons} d-f align-center justify-end`, children: [_jsx(LibButton, { label: "Back", onSubmit: onBack, backgroundColor: "#57417e", hoverColor: "#49356a", padding: "0 20px" }), _jsx(LibButton, { label: "Submit", onSubmit: handleCreateService, backgroundColor: "#825beb", hoverColor: "#6c46d9", padding: "0 20px" })] })] }));
};
export default ServiceForm;
