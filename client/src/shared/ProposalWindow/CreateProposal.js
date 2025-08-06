import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import LibButton from "../../libs/common/lib-button/LibButton";
import FileInput from "../../libs/common/lib-file-input/FileInput";
import TextInput from "../../libs/common/lib-text-input/TextInput";
import TextAreaInput from "../../libs/common/lib-textArea/TextAreaInput";
import styles from "./CreateProposal.module.css";
const CreateProposal = ({ onCreateProposal, requestIndentifier, createProposalError, requestBudget, onBack, }) => {
    const [proposalForm, setProposalForm] = useState({
        estimatedDeadline: "",
        amount: 0,
        file: new File([], ""),
        description: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const handleSubmitProposal = () => {
        const errors = {};
        if (proposalForm.amount < (requestBudget || 0)) {
            errors.amount = `* Amount should be greater than ${requestBudget}$`;
        }
        const deadlineDate = new Date(proposalForm.estimatedDeadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (deadlineDate < today) {
            errors.estimatedDeadline = "* Deadline cannot be in the past.";
        }
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        // No errors
        setFormErrors({});
        onCreateProposal(proposalForm);
        resetStates();
    };
    const resetStates = () => {
        setProposalForm({
            estimatedDeadline: "",
            amount: 0,
            file: new File([], ""),
            description: "",
        });
        setFormErrors({});
    };
    const handelBack = () => {
        resetStates();
        onBack();
    };
    return (_jsxs("div", { className: `${styles.wrapper} d-f f-dir-col gap-1`, children: [_jsxs("div", { className: styles.header, children: [_jsx("h1", { children: "Create New proposal" }), _jsx("p", { className: styles.placeholder, children: requestIndentifier })] }), _jsxs("form", { children: [_jsxs("div", { className: "d-f", style: { gap: "1rem" }, children: [_jsx(TextInput, { name: "estimatedDeadline", label: "Estimated deadline", type: "date", placeholder: "Ex: 3 weeks, 1 month ...", required: false, value: proposalForm["estimatedDeadline"], errorMessage: formErrors.estimatedDeadline || "", onChange: (value) => setProposalForm((prev) => ({
                                    ...prev,
                                    estimatedDeadline: value,
                                })) }), _jsx(TextInput, { name: "amount", min: 0, max: 999999, label: "Amount", type: "number", placeholder: "Amount", value: proposalForm["amount"].toString(), onChange: (value) => {
                                    setFormErrors((prev) => ({ ...prev, amount: undefined }));
                                    setProposalForm((prev) => ({
                                        ...prev,
                                        amount: Number(value) || 0,
                                    }));
                                }, required: false, errorMessage: formErrors.amount || "" })] }), _jsx(FileInput, { name: "file", label: "Attach your file", placeholder: "Attach your file", required: false, value: proposalForm["file"], onChange: (file) => setProposalForm((prev) => ({
                            ...prev,
                            file: file,
                        })) }), _jsx(TextAreaInput, { name: "description", label: "Description", placeholder: "Enter description", required: false, value: proposalForm["description"], onChange: (value) => setProposalForm((prev) => ({
                            ...prev,
                            description: value,
                        })) })] }), createProposalError && (_jsx("small", { className: "errorMsg d-f align-center error", children: createProposalError })), _jsxs("div", { className: `${styles.btnsContainer} d-f align-center justify-between`, children: [_jsx(LibButton, { label: "Back", onSubmit: handelBack, backgroundColor: "#57417e", hoverColor: "#49356a" }), _jsx(LibButton, { label: "Submit", onSubmit: handleSubmitProposal })] })] }));
};
export default CreateProposal;
