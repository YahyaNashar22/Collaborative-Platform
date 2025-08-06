import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./AsignDrawer.module.css";
import LibButton from "../../libs/common/lib-button/LibButton";
const AssignModal = ({ requestId, onClose }) => {
    const [selectedProvider, setSelectedProvider] = useState(null);
    // Replace with actual provider list
    const providers = [
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Smith" },
        { id: "3", name: "Ali Saeed" },
    ];
    const handleAssign = () => {
        if (!selectedProvider)
            return;
        // TODO: call API to assign provider here
        onClose();
    };
    return (_jsx("div", { className: styles.modalOverlay, children: _jsxs("div", { className: styles.modal, children: [_jsx("h3", { children: "Assign Request to Provider" }), _jsxs("select", { className: styles.select, value: selectedProvider || "", onChange: (e) => setSelectedProvider(e.target.value), children: [_jsx("option", { value: "", children: "-- Select a Provider --" }), providers.map((provider) => (_jsx("option", { value: provider.id, children: provider.name }, provider.id)))] }), _jsxs("div", { className: styles.actions, children: [_jsx(LibButton, { label: "Cancel", onSubmit: onClose, outlined: true }), _jsx(LibButton, { label: "Assign", onSubmit: handleAssign, bold: true, disabled: !selectedProvider })] })] }) }));
};
export default AssignModal;
