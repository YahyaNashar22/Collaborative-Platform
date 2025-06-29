import Multiselect from "multiselect-react-dropdown";
import styles from "./SelectInput.module.css";
import { multiSelectType } from "../../../interfaces/registerSignup";

type SelectInputProps = {
  label: string;
  name: string;
  type: string;
  value: string | multiSelectType[];
  required?: boolean;
  placeholder?: string;
  options: multiSelectType[];
  errorMessage?: string;
  onChange: (value: string | multiSelectType[], name: string) => void;
  onBlur?: () => void;
  onRemove?: (items: multiSelectType[]) => void;
};

const SelectInput = ({
  label,
  name,
  value,
  type,
  required = false,
  placeholder,
  options,
  errorMessage,
  onChange,
  onRemove,
}: SelectInputProps) => {
  return (
    <div className={`${styles.inputContainer} d-f f-dir-col`}>
      <label htmlFor={name} className="bold">
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      {type === "select" ? (
        <div
          className={`${styles.inputHolder}  ${
            errorMessage && styles.error
          } pointer d-f`}
        >
          <select
            id={name}
            name={name}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value, name)}
            required={required}
            className="pointer"
          >
            {placeholder && (
              <option value="" hidden>
                {placeholder}
              </option>
            )}
            {options.map((opt, idx) => (
              <option className="pointer" key={idx} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
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
