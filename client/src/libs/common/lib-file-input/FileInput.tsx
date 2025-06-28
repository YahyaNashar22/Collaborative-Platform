import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./FileInput.module.css";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

type FileInputProps = {
  label: string;
  name: string;
  required?: boolean;
  errorMessage?: string;
  placeholder: string;

  onChange: (file: File | null, name: string) => void;
};

const FileInput = ({
  label,
  name,
  required = false,
  errorMessage,
  onChange,

  placeholder,
}: FileInputProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file, name);
  };

  return (
    <div className={`${styles.inputContainer} d-f f-dir-col`}>
      <label htmlFor={name} className="bold">
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <div
        className={`${styles.fileWrapper} ${errorMessage ? styles.error : ""}`}
      >
        <div
          className={`${styles.inputHolder}  ${
            errorMessage ? styles.error : ""
          }  d-f align-center`}
        >
          <input
            type="file"
            id={name}
            name={name}
            placeholder={placeholder}
            onChange={handleFileChange}
          />
          <label htmlFor={name} className={styles.customFileLabel}>
            <FontAwesomeIcon
              icon={faFolderPlus}
              size="xl"
              style={{ color: "#495057" }}
            />
          </label>
        </div>
      </div>
      {errorMessage && <small className="error">{errorMessage}</small>}
    </div>
  );
};

export default FileInput;
