import styles from "./TextAreaInput.module.css";

type TextAreaInputProps = {
  label: string;
  placeholder: string;
  name: string;
  required: boolean;
  value: string;
  maxLength?: number;
  disabled?: boolean;
  errorMessage?: string;
  onChange: (value: string, name: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

const TextAreaInput = ({
  label,
  placeholder,
  name,
  required,
  value,
  disabled = false,
  onChange,
  errorMessage,
  maxLength = 1000,
  onBlur,
}: TextAreaInputProps) => {
  return (
    <div
      className={`${styles.inputContainer} ${
        errorMessage ? styles.error : ""
      }  d-f f-dir-col`}
    >
      <label htmlFor={name} className="bold">
        <span>
          {label} {required && <span className={styles.required}>*</span>}
        </span>
      </label>
      <div
        className={`${styles.inputHolder} ${
          disabled ? styles.disabled : ""
        } d-f align-center ${errorMessage ? styles.error : ""}`}
      >
        <textarea
          required={required}
          name={name}
          id={name}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          rows={4}
          cols={50}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value, name)}
          onBlur={onBlur}
        />
        <div className={styles.length}>
          {value?.length} / {maxLength}
        </div>
      </div>
      {errorMessage && <small className="error">{errorMessage}</small>}
    </div>
  );
};

export default TextAreaInput;
