import styles from "./TextInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { multiSelectType } from "../../../interfaces/registerSignup";
import { getStringValue } from "../../../utils/CastToString";

type props = {
  label?: string;
  placeholder: string;
  name: string;
  type: string;
  value: string | multiSelectType[];
  required: boolean;
  maxLength?: number;
  minLength?: number;
  onChange: (value: string, name: string) => void;
  isShowPassword?: boolean;
  errorMessage?: string;
  hasIcon?: boolean;
  min?: number;
  max?: number;
  hasCurrency?: boolean;
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
  min,
  max,
  hasCurrency = false,
  hasIcon = false,
}: props) => {
  return (
    <div
      className={`${styles.inputContainer} ${
        name === "search_projects" ? styles.search_inputContainer : ""
      } d-f f-dir-col`}
    >
      <label htmlFor={name} className="bold">
        <span>
          {label} {required && <span className={styles.required}>*</span>}
        </span>
      </label>
      <div className="d-f align-center">
        <div
          className={`${styles.inputHolder}  ${
            errorMessage ? styles.error : ""
          } ${name === "phone" ? styles.phoneInput : ""} d-f align-center`}
        >
          {name === "phone" ? (
            <PhoneInput
              style={{ width: "100%" }}
              defaultCountry="lb"
              value={getStringValue(value)}
              required={required}
              onChange={(phone) => onChange(phone, name)}
              className="custom-phone-input-wrapper"
              onBlur={onBlur}
            />
          ) : (
            <>
              <input
                type={type === "password" && isShowPassword ? "text" : type}
                id={name}
                placeholder={placeholder}
                name={name}
                value={getStringValue(value)}
                required={required}
                maxLength={maxLength}
                minLength={minLength || 0}
                {...(type === "number" ? { min } : {})}
                {...(type === "number" ? { max } : {})}
                onChange={(e) => onChange(e.target.value, name)}
                onBlur={onBlur}
              />

              {hasIcon && (
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  style={{ color: "#757575" }}
                />
              )}
            </>
          )}
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
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{ color: "#495059" }}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {hasCurrency && (
          <div
            className={`${styles.currencySymbol} d-f align-center justify-center intense`}
          >
            USD
          </div>
        )}
      </div>
      {errorMessage && <small className="error">{errorMessage}</small>}
    </div>
  );
};

export default TextInput;
