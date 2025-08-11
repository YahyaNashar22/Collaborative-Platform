import React, { useState } from "react";

import styles from "./OrganizationData.module.css";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import LibButton from "../../../libs/common/lib-button/LibButton";
import { registerFormData } from "../../../data/registerFormData";
import { FormField } from "../../../interfaces/registerSignup";
import TextAreaInput from "../../../libs/common/lib-textArea/TextAreaInput";
import SelectInput from "../../../libs/common/lib-select-input/SelectInput";
import FileInput from "../../../libs/common/lib-file-input/FileInput";
import { OrganizationDataProps } from "../../../interfaces/Profile";
import { Validate } from "../../../utils/Validate";
import { downloadFile } from "../../../services/FileUpload";

const fields: FormField[] =
  registerFormData.roles.client.types.company.formData[1].form;

const OrganizationData: React.FC<OrganizationDataProps> = ({
  userData,
  onCancel,
  onSave,
  isViewer = false,
}) => {
  const [updatedData, setUpdatedData] = useState({});
  const [errors, setErrors] = useState({});

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
    <div className={styles.companyDataTab}>
      <form className={`${styles.form} d-f f-dir-col `}>
        {fields.slice(0, 3).map((field: FormField, index: number) => {
          return (
            <div key={index}>
              {field.type === "aria" ? (
                <TextAreaInput
                  label={field.label}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={updatedData[field.name] ?? userData[field.name] ?? ""}
                  required={field.required || false}
                  onChange={(value, name) =>
                    handleChange(
                      name,
                      value,
                      field.required || false,
                      field.type
                    )
                  }
                  disabled={isViewer}
                />
              ) : (
                <TextInput
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={updatedData[field.name] ?? userData[field.name] ?? ""}
                  required={field.required || false}
                  maxLength={Number(field.maxLength)}
                  minLength={Number(field.minLength)}
                  min={Number(field.minLength)}
                  onChange={(value, name) =>
                    handleChange(
                      name,
                      value,
                      field.required || false,
                      field.type
                    )
                  }
                  errorMessage={errors[field.name]}
                  disabled={isViewer}
                />
              )}
            </div>
          );
        })}
        <div className={`${styles.firstRow} d-f w-100`} style={{ gap: "20px" }}>
          {fields.slice(3, 5).map((field: FormField, index: number) => (
            <div key={index} style={{ flex: 1 }}>
              <SelectInput
                label={field.label}
                name={field.name}
                type={field.type}
                value={updatedData[field.name] ?? userData[field.name] ?? ""}
                required={field.required}
                placeholder={field.placeholder}
                options={field.options || []}
                onChange={(value, name) =>
                  handleChange(
                    field.name,
                    value,
                    field.required || false,
                    field.type
                  )
                }
                errorMessage={errors[field.name]}
                disabled={isViewer}
              />
            </div>
          ))}
        </div>
        {fields.slice(5).map((field: FormField, index: number) => {
          return (
            <div key={index}>
              <FileInput
                label={field.label}
                placeholder={field.placeholder}
                name={field.name}
                value={updatedData[field.name] ?? userData[field.name] ?? ""}
                required={field.required || false}
                onChange={(value) =>
                  handleChange(
                    field.name,
                    value,
                    field.required || false,
                    field.type
                  )
                }
                errorMessage={errors[field.name]}
                disabled={isViewer}
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
          );
        })}
      </form>

      {!isViewer && (
        <div className={`${styles.buttons} d-f align-center justify-between`}>
          <LibButton
            label="Cancel"
            onSubmit={onCancel}
            outlined
            color="var(--deep-purple)"
            hoverColor="#8563c326"
            padding="0"
          />
          <LibButton label="Save" onSubmit={handleSave} padding="0" />
        </div>
      )}
    </div>
  );
};

export default OrganizationData;
