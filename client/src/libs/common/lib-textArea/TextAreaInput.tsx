import { useState } from "react";
import styles from "./TextAreaInput.module.css";

type props = {
  label: string;
  placeholder: string;
  name: string;
  required: boolean;
  onChange: (value: string, name: string) => void;
};

const TextAreaInput = ({
  label,
  placeholder,
  name,
  required,
  onChange,
}: props) => {
  const [descriptionValue, setDescriptionValue] = useState("");
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // prevant enter value if max reached
    if (descriptionValue.length === max) return;
    if (error) setError(false);
    onChange(e.target.value, name);
    setDescriptionValue(e.target.value);
  };

  const handleCLick = () => {
    setFocus(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (focus && e.target.value.length === 0) setError(true);
  };

  const max: number = 1000;

  return (
    <div className={`${styles.inputContainer} d-f f-dir-col`}>
      <label htmlFor={name} className="bold">
        <span>
          {label} {required && <span className={styles.required}>*</span>}
        </span>
      </label>
      <div
        className={`${styles.inputHolder} ${
          error ? styles.error : ""
        } d-f align-center`}
      >
        <textarea
          required={required}
          name={name}
          maxLength={max}
          id={name}
          rows={4}
          cols={50}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={(e) => handleBlur(e)}
          onClick={handleCLick}
        ></textarea>
        <div className={styles.length}>
          {descriptionValue.length} / {max}
        </div>
      </div>
      {error && <small className="error">* This field is required.</small>}
    </div>
  );
};

export default TextAreaInput;
