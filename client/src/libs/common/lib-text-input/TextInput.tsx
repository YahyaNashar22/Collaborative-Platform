import { useState } from "react";
import styles from "./TextInput.module.css";

type props = {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  required: boolean;
  onChange: (value: string, name: string) => void;
};
const TextInput = ({
  type,
  label,
  placeholder,
  name,
  required,
  onChange,
}: props) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // handle if user clear all data and didn't blur yet
    if (e.target.value.length === 0) setError(true);

    if (error) setError(false);

    if (isEmail && !emailRegex.test(e.target.value)) {
      setEmailError(true);
    } else if (emailRegex.test(e.target.value)) {
      setEmailError(false);
    }
    onChange(e.target.value, name);
  };

  const handleCLick = (e: React.MouseEvent<HTMLInputElement>) => {
    setFocus(true);
    if ((e.target as HTMLInputElement).name === "email") setIsEmail(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // reset isEmailError
    setIsEmail(false);
    if (focus && e.target.value.length === 0) setError(true);
  };

  return (
    <div className={`${styles.inputContainer} d-f f-dir-col`}>
      <label htmlFor={name} className="bold">
        <span>
          {label} {required && <span className={styles.required}>*</span>}
        </span>
      </label>
      <div
        className={`${styles.inputHolder}  ${
          error || emailError ? styles.error : ""
        } d-f align-center`}
      >
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          name={name}
          required={required}
          onChange={handleChange}
          onClick={(e) => handleCLick(e)}
          onBlur={(e) => handleBlur(e)}
        />
      </div>
      {error && <small className="error">* This field is required.</small>}
      {emailError && !error && (
        <small className="error">* Please enter a valid email.</small>
      )}
    </div>
  );
};

export default TextInput;
