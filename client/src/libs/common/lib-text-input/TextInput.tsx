import styles from "./TextInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type props = {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  value: string;
  required: boolean;
  maxLength?: number;
  minLength?: number;
  onChange: (value: string, name: string) => void;
  isShowPassword?: boolean;
  errorMessage?: string;
  toggleShowPassword?: () => void;
  onBlur?: () => void;
};
const TextInput = ({
  type,
  label,
  placeholder,
  name,
  value,
  required,
  maxLength,
  minLength,
  onChange,
  isShowPassword,
  toggleShowPassword,
  errorMessage,
  onBlur,
}: props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, name);
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
          errorMessage ? styles.error : ""
        } d-f align-center`}
      >
        <input
          type={type === "password" && isShowPassword ? "text" : type}
          id={name}
          placeholder={placeholder}
          name={name}
          value={value}
          required={required}
          maxLength={maxLength || 0}
          minLength={minLength || 0}
          onChange={handleChange}
          onBlur={onBlur}
        />
        {type === "password" && (
          <div className="pointer">
            {type === "password" && toggleShowPassword && (
              <div className="pointer" onClick={toggleShowPassword}>
                {isShowPassword ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    style={{ color: "#495059" }}
                  />
                ) : (
                  <FontAwesomeIcon icon={faEye} style={{ color: "#495059" }} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {errorMessage && <small className="error">{errorMessage}</small>}
    </div>
  );
};

export default TextInput;
