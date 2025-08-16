import Multiselect from "multiselect-react-dropdown";
import styles from "./SelectInput.module.css";
import Select, { components } from "react-select";

type OptionType = { label: string; value: string };

type SelectInputProps = {
  label: string;
  name: string;
  type: string;
  value: string | OptionType[];
  required?: boolean;
  placeholder?: string;
  options: OptionType[];
  errorMessage?: string;
  disabled?: boolean;
  interestedProviders?: string[];
  onChange: (value: string | OptionType[], name: string) => void;
  onBlur?: () => void;
  onRemove?: (items: OptionType[]) => void;
};

const CustomOption = (props: any) => {
  const { data, selectProps } = props;
  const interestedProviders: string[] = selectProps.interestedProviders || [];
  const isInterested = interestedProviders.includes(data.value);
  return (
    <components.Option {...props}>
      <div style={{ gap: "8px" }} className="d-f align-center justify-between">
        {props.label}
        {isInterested && <small className="purple bold">Interested</small>}
      </div>
    </components.Option>
  );
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
  interestedProviders = [],
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

  const getSelectedOption = (
    value: string | OptionType[],
    options: OptionType[]
  ) => {
    if (typeof value === "string") {
      return options.find((opt) => opt.value === value) || null;
    }
    return value;
  };

  value;
  return (
    <div className={`${styles.inputContainer} d-f f-dir-col`}>
      <label htmlFor={name} className="bold">
        {label} {required && <span className={styles.required}>*</span>}
      </label>

      {type === "select" ? (
        <Select
          id={name}
          name={name}
          options={options}
          value={getSelectedOption(value, options)}
          onChange={(selectedOptions) => {
            onChange(selectedOptions?.value, selectedOptions?.label);
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
          components={{ Option: CustomOption }}
          interestedProviders={interestedProviders}
        />
      ) : (
        <Multiselect
          options={options}
          selectedValues={Array.isArray(value) ? value : []}
          onSelect={(items) => onChange(items, name)}
          onRemove={(items) => {
            onChange(items, name);
            onRemove?.(items);
          }}
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
