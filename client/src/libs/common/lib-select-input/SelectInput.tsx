import Multiselect from "multiselect-react-dropdown";
import styles from "./SelectInput.module.css";
import Select from "react-select";
type SelectInputProps = {
  label: string;
  name: string;
  type: string;
  value: string | { [key: string]: string }[];
  required?: boolean;
  placeholder?: string;
  options: { [key: string]: string }[];
  errorMessage?: string;
  disabled?: boolean;
  onChange: (value: string | { [key: string]: string }[], name: string) => void;
  onBlur?: () => void;
  onRemove?: (items: { [key: string]: string }[]) => void;
};

const SelectInput = ({
  label,
  name,
  value,
  type,
  required = false,
  placeholder,
  disabled,
  options,
  errorMessage,
  onChange,
  onRemove,
}: SelectInputProps) => {
  const getCustomStyles = (hasError: boolean) => ({
    container: (provided: any) => ({
      ...provided,
      width: "100%",
      zIndex: 9999,
    }),
    control: (base: any, state: any) => ({
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
    placeholder: (base: any) => ({
      ...base,
      fontSize: "12px",
    }),
    option: (base: any, state: any) => ({
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
    menu: (base: any) => ({
      ...base,
      boxShadow: "none",
      border: "1px solid #ccc",
      fontSize: "12px",
      zIndex: 9999,
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),
    singleValue: (base: any) => ({
      ...base,
      fontSize: "12px",
      color: "#333",
    }),
  });

  const getSelectedOption = (value, options) => {
    return options.find((opt) => opt.value === value) || null;
  };
  return (
    <div className={`${styles.inputContainer} d-f f-dir-col`}>
      <label htmlFor={name} className="bold">
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      {type === "select" ? (
        // <div
        //   className={`${styles.inputHolder}  ${
        //     errorMessage && styles.error
        //   } pointer d-f`}
        // >
        <Select
          id={name}
          name={name}
          options={options}
          value={getSelectedOption(value, options)}
          onChange={(selectedOption) => {
            onChange(selectedOption?.value, selectedOption?.label);
          }}
          isDisabled={disabled}
          isClearable={!required}
          placeholder={placeholder}
          classNamePrefix={`${errorMessage && styles.error}`}
          className="pointer"
          styles={getCustomStyles(!!errorMessage)}
          menuPortalTarget={
            typeof document !== "undefined" ? document.body : null
          }
          menuPosition="fixed"
          menuShouldScrollIntoView={false}
        />
      ) : (
        // </div>
        <Multiselect
          options={options}
          onSelect={(items) => onChange(items, name)}
          onRemove={(items) => onRemove?.(items)}
          displayValue="label"
          placeholder={placeholder}
          className={`multiSelect pointer ${errorMessage && "specialError"}`}
        />
      )}
      {errorMessage && <small className="error">{errorMessage}</small>}
    </div>
  );
};

export default SelectInput;
