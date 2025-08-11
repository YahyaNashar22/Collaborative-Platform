import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import styles from "./PersonalData.module.css";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import LibButton from "../../../libs/common/lib-button/LibButton";
import { PersonalDataTabProps } from "../../../interfaces/Profile";
import { Validate } from "../../../utils/Validate";

interface InputField {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  errorMsg: string;
}

const fields: InputField[] = [
  {
    name: "firstName",
    label: "First Name",

    placeholder: "First Name",
    type: "text",
    maxLength: 15,
    required: true,
    errorMsg: "* This Field is Required",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Last Name",
    type: "text",
    maxLength: 15,
    required: true,
    errorMsg: "* This Field is Required",
  },
  {
    name: "email",
    label: "Email",

    placeholder: "Email",
    type: "email",
    maxLength: 30,
    required: true,
    errorMsg: "* This Field is Required",
  },
  {
    name: "recoveryEmail",
    label: "Recovery email",
    placeholder: "Recovery email",
    type: "email",
    maxLength: 30,
    required: false,
    errorMsg: "* This Field is Required",
  },
  {
    name: "phone",
    label: "Phone number",
    placeholder: "Phone number",
    type: "text",
    maxLength: 20,
    required: true,
    errorMsg: "* This Field is Required",
  },
  {
    name: "job",
    label: "Job title",

    placeholder: "Job title",
    type: "text",
    maxLength: 20,
    required: false,
    errorMsg: "* This Field is Required",
  },
];

const PersonalDataTab: React.FC<PersonalDataTabProps> = ({
  userData,
  onCancel,
  onSave,
  isViewer = false,
}) => {
  const [updatedData, setUpdatedData] = useState({});
  const [errors, setErrors] = useState({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setUpdatedData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (Object.keys(errors).length === 0) onSave(updatedData);
  };

  const handleChange = (
    name: string,
    value: string,
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

  return (
    <div className={styles.personalData}>
      {/* Profile Picture Upload */}
      <div
        className={`${styles.background} ${styles.isViewer} `}
        style={{
          backgroundImage:
            updatedData.profilePicture || userData.profilePicture
              ? `url(${updatedData.profilePicture || userData.profilePicture})`
              : "none",
        }}
      >
        <label
          className={`${styles.penHolder} d-f align-center justify-center`}
        >
          <input
            type="file"
            name="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleFileChange}
            disabled={isViewer}
          />
          {!isViewer && (
            <FontAwesomeIcon
              icon={faPen}
              size="2xs"
              className={styles.pen}
              style={{ color: "#ffffff" }}
            />
          )}
        </label>

        {!updatedData.profilePicture &&
          !userData.profilePicture &&
          userData.firstName &&
          userData.lastName && (
            <div className={styles.initials}>
              {`${userData.firstName[0].toUpperCase()}${userData.lastName[0].toUpperCase()}`}
            </div>
          )}
      </div>

      {/* Form Inputs */}
      <form className={`${styles.form} d-f f-dir-col`}>
        {Array.from({ length: Math.ceil(fields.length / 2) }, (_, rowIndex) => {
          const rowFields = fields.slice(rowIndex * 2, rowIndex * 2 + 2);
          return (
            <div
              key={rowIndex}
              className="d-f w-100"
              style={{ gap: "20px", marginBottom: "20px" }}
            >
              {rowFields.map((field) => (
                <div key={field.name} style={{ flex: 1 }}>
                  <TextInput
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    name={field.name}
                    value={
                      updatedData[field.name] ?? userData[field.name] ?? ""
                    }
                    required={field.required}
                    maxLength={field.maxLength}
                    minLength={field.minLength}
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
                </div>
              ))}
            </div>
          );
        })}
      </form>

      {!isViewer && (
        <div
          className={`${styles.resetPasswordHolder} d-f align-center justify-between`}
        >
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

export default PersonalDataTab;
