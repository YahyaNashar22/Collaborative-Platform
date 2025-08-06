import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import styles from "./TagSelector.module.css";
import SelectInput from "../../libs/common/lib-select-input/SelectInput";
const TagSelector = ({ label, name, placeholder, options, required = false, onReady, }) => {
    const [lockedAssigned, setLockedAssigned] = useState([]);
    const [sessionAssigned, setSessionAssigned] = useState([]);
    const [unassigned, setUnassigned] = useState([]);
    const [, setInitialAssigned] = useState([]);
    useEffect(() => {
        const assigned = options.assigned || [];
        const unassignedClean = options.unassigned?.filter((u) => !assigned.some((a) => a.value === u.value)) || [];
        setLockedAssigned(assigned);
        setInitialAssigned(assigned);
        setSessionAssigned([]);
        setUnassigned(unassignedClean);
    }, [options]);
    useEffect(() => {
        if (!onReady)
            return;
        const currentAssigned = [...lockedAssigned, ...sessionAssigned];
        onReady(() => currentAssigned);
    }, [lockedAssigned, sessionAssigned, onReady]);
    const handleAdd = (id, label) => {
        const selected = { label, value: id };
        setSessionAssigned((prev) => [...prev, selected]);
        setUnassigned((prev) => prev.filter((p) => p.value !== id));
    };
    const handleRemove = (id) => {
        if (!sessionAssigned.find((p) => p.value === id))
            return;
        const removed = sessionAssigned.find((p) => p.value === id);
        if (!removed)
            return;
        setSessionAssigned((prev) => prev.filter((p) => p.value !== id));
        setUnassigned((prev) => [...prev, removed]);
    };
    // const areTagListsEqual = (
    //   a: { [key: string]: string }[],
    //   b: { [key: string]: string }[]
    // ) => {
    //   if (a.length !== b.length) return false;
    //   const aSorted = [...a].sort((x, y) => x.value.localeCompare(y.value));
    //   const bSorted = [...b].sort((x, y) => x.value.localeCompare(y.value));
    //   return aSorted.every((item, index) => item.value === bSorted[index].value);
    // };
    return (_jsxs("div", { className: styles.container, children: [_jsx(SelectInput, { label: label, name: name, type: "select", value: "", placeholder: placeholder, options: unassigned, onChange: (id, label) => handleAdd(id, label), required: required, disabled: unassigned.length === 0 }), lockedAssigned.length === 0 &&
                sessionAssigned.length === 0 &&
                unassigned.length === 0 && (_jsx("div", { className: styles.noProvidersMessage, children: "There is no provider for this service yet." })), _jsxs("div", { className: styles.tags, children: [lockedAssigned.map((item) => (_jsxs("div", { className: styles.tag, children: [item.label, _jsx("span", { className: styles.locked, children: "\uD83D\uDD12" })] }, item.value))), sessionAssigned.map((item) => (_jsxs("div", { className: styles.tag, children: [item.label, _jsx("button", { type: "button", onClick: () => handleRemove(item.value), "aria-label": `Remove ${item.label}`, children: "\u00D7" })] }, item.value)))] })] }));
};
export default TagSelector;
