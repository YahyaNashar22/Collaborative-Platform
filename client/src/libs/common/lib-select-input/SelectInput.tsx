import styles from "./SelectInput.module.css";

type Option = {
  label: string;
  value: string;
};

type SelectInputProps = {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  options: Option[];
  errorMessage?: string;
  onChange: (value: string, name: string) => void;
  onBlur?: () => void;
};

const SelectInput = ({
  label,
  name,
  value,
  required = false,
  placeholder,
  options,
  errorMessage,
  onChange,
}: SelectInputProps) => {
  return (
    <div className={`${styles.inputContainer} d-f f-dir-col`}>
      <label htmlFor={name} className="bold">
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <div
        className={`${styles.inputHolder}  ${
          errorMessage && styles.error
        } pointer d-f`}
      >
        <select
          id={name}
          name={name}
          value={value}
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
      {errorMessage && <small className="error">{errorMessage}</small>}
    </div>
  );
};

export default SelectInput;
