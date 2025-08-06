import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Multiselect from "multiselect-react-dropdown";
import styles from "./SelectInput.module.css";
import Select from "react-select";
const SelectInput = ({ label, name, value, type, required = false, placeholder, disabled, options, errorMessage, onChange, onRemove, }) => {
    const getCustomStyles = (hasError) => ({
        container: (provided) => ({
            ...provided,
            width: "100%",
            zIndex: 9999,
        }),
        control: (base, state) => ({
            ...base,
            width: "100%",
            borderColor: hasError
                ? "var(--error)"
                : state.isFocused
                    ? "var(--intense-purple)"
                    : "#ccc",
            boxShadow: "none",
            outline: "none",
            "&:hover": {
                borderColor: "none",
            },
        }),
        placeholder: (base) => ({
            ...base,
            fontSize: "12px",
        }),
        option: (base, state) => ({
            ...base,
            fontSize: "12px",
            backgroundColor: state.isSelected
                ? "#825beb"
                : state.isFocused
                    ? "#f0f0f0"
                    : "#fff",
            color: state.isSelected ? "#fff" : "#333",
            "&:active": {
                backgroundColor: "#6c46d9",
            },
        }),
        menu: (base) => ({
            ...base,
            boxShadow: "none",
            border: "1px solid #ccc",
            fontSize: "12px",
            zIndex: 9999,
        }),
        menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
        }),
        singleValue: (base) => ({
            ...base,
            fontSize: "12px",
            color: "#333",
        }),
    });
    const getSelectedOption = (value, options) => {
        return options.find((opt) => opt.value === value) || null;
    };
    return (_jsxs("div", { className: `${styles.inputContainer} d-f f-dir-col`, children: [_jsxs("label", { htmlFor: name, className: "bold", children: [label, " ", required && _jsx("span", { className: styles.required, children: "*" })] }), type === "select" ? (
            // <div
            //   className={`${styles.inputHolder}  ${
            //     errorMessage && styles.error
            //   } pointer d-f`}
            // >
            _jsx(Select, { id: name, name: name, options: options, value: getSelectedOption(value, options), onChange: (selectedOption) => {
                    onChange(selectedOption?.value, selectedOption?.label);
                }, isDisabled: disabled, isClearable: !required, placeholder: placeholder, classNamePrefix: `${errorMessage && styles.error}`, className: "pointer", styles: getCustomStyles(!!errorMessage), menuPortalTarget: typeof document !== "undefined" ? document.body : null, menuPosition: "fixed", menuShouldScrollIntoView: false })) : (
            // </div>
            _jsx(Multiselect, { options: options, onSelect: (items) => onChange(items, name), onRemove: (items) => onRemove?.(items), displayValue: "label", placeholder: placeholder, className: `multiSelect pointer ${errorMessage && "specialError"}` })), errorMessage && _jsx("small", { className: "error", children: errorMessage })] }));
};
export default SelectInput;
