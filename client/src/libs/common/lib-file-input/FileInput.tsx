import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./FileInput.module.css";

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
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file?.name || "");
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
        <div className={`${styles.inputHolder} d-f align-center`}>
          <label
            htmlFor={name}
            className={`${`${styles.customFileLabel} d-f w-100 align-center pointer bold`} `}
          >
            <FontAwesomeIcon
              icon={faFolderPlus}
              size="xl"
              style={{ color: "#495057" }}
            />
            <span className={styles.placeholderText}>
              {fileName || placeholder}
            </span>
          </label>

          <input
            type="file"
            id={name}
            name={name}
            className={styles.hiddenInput}
            required={required}
            onChange={handleFileChange}
          />
        </div>
      </div>

      {errorMessage && <small className="error">{errorMessage}</small>}
    </div>
  );
};

export default FileInput;
