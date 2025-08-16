import { registerFormData } from "../../../data/registerFormData";
import { RequiredDocuments as RequiredDocumentsProps } from "../../../interfaces/Profile";
import { FormField } from "../../../interfaces/registerSignup";
import styles from "./RequiredDocuments.module.css";
import FileInput from "../../../libs/common/lib-file-input/FileInput";
import { downloadFile } from "../../../services/FileUpload";
import { Validate } from "../../../utils/Validate";
import { useState } from "react";
import LibButton from "../../../libs/common/lib-button/LibButton";

interface Props extends RequiredDocumentsProps {
  formFields: FormField[];
  handleChange: (name: string, value: any, required: boolean) => void;
  handleBlur?: (
    name: string,
    value: any,
    required: boolean,
    type: string
  ) => void;
}

const RequiredDocuments = ({
  userData,

  onCancel,
  onSave,
}: Props) => {
  const [updatedData, setUpdatedData] = useState({});
  const [errors, setErrors] = useState({});

  const fields: FormField[] =
    registerFormData.roles.provider.types.default.formData[4].form;

  const handleChange = (
    name: string,
    value: string | string[],
    required: boolean,
    type: string
  ) => {
    if (value === userData[name]) {
      setUpdatedData((prev) => {
        const newData = { ...prev };
        delete newData[name];
        return newData;
      });
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      return;
    }
    setUpdatedData((prev) => ({ ...prev, [name]: value }));

    const error = Validate(name, value, required, type);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) newErrors[name] = error;
      else delete newErrors[name];
      return newErrors;
    });
  };

  const handleSave = () => {
    if (Object.keys(errors).length === 0) onSave(updatedData);
  };
  return (
    <div className={`${styles.formContainer} d-f f-dir-col`}>
      <form>
        {fields.map((field, index) => (
          <div key={index}>
            <FileInput
              name={field.name}
              label={field.label}
              value={
                (updatedData as any)[field.name] ||
                (userData as any)[field.name] ||
                ""
              }
              placeholder={field.placeholder}
              required={field.required || false}
              onChange={(value, name) =>
                handleChange(name, value, field.required || false, field.type)
              }
              errorMessage={errors[field.name]}
            />

            <li className={styles.uploadedItem}>
              <div className={styles.fileDetails}>
                <span className={styles.fileName}>
                  {userData[field.name] || "No File Uploaded"}
                </span>
              </div>
              <div
                className={`${styles.downloadLink} pointer`}
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  downloadFile(userData[field.name]);
                }}
              >
                ⬇ Download
              </div>
            </li>
          </div>
        ))}
      </form>
      <div className={`${styles.buttons} d-f align-center justify-between`}>
        <LibButton
          label="Cancel"
          onSubmit={onCancel}
          outlined
          color="var(--deep-purple)"
          hoverColor="#8563c326"
          padding="0"
        />
        <LibButton
          label="Save"
          onSubmit={handleSave}
          backgroundColor="#825beb"
          hoverColor="#6c46d9"
          padding="0"
        />
      </div>
    </div>
  );
};

export default RequiredDocuments;
