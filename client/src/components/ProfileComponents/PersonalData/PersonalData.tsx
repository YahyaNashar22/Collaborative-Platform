import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import styles from "./PersonalData.module.css";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import LibButton from "../../../libs/common/lib-button/LibButton";

interface PersonalInputs {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
  role?: string;
}

interface PersonalDataTabProps {
  userData: { [key: string]: string };
  updateData: { [key: string]: string };
  errors: Record<string, string>;
  personalInputs: PersonalInputs[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (
    name: string,
    value: string,
    required: boolean,
    type: string
  ) => void;
  onCancel: () => void;
  onSave: () => void;
}

const PersonalDataTab: React.FC<PersonalDataTabProps> = ({
  userData,
  updateData,
  errors,
  personalInputs,
  onFileChange,
  onChange,
  onCancel,
  onSave,
}) => {
  return (
    <div className={styles.personalData}>
      <div
        className={styles.background}
        style={{
          backgroundImage: userData.profilePicture
            ? `url(${updateData.profilePicture ?? userData.profilePicture})`
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
            onChange={onFileChange}
          />
          <FontAwesomeIcon
            className={styles.pen}
            icon={faPen}
            size="2xs"
            style={{ color: "#ffffff" }}
          />
        </label>

        {userData.profilePicture === "default" &&
          !updateData.profilePicture && (
            <div>{`${userData.firstName[0].toUpperCase()} ${userData.lastName[0].toUpperCase()}`}</div>
          )}
      </div>

      <form className="d-f f-dir-col ">
        <div className={`${styles.firstRow} d-f gap-1`}>
          {personalInputs.slice(0, 2).map((input) => (
            <TextInput
              key={input.name}
              {...input}
              errorMessage={errors[input.name]}
              value={updateData[input.name] ?? userData[input.name]}
              onChange={(value, name) =>
                onChange(name, value, input.required, input.type)
              }
            />
          ))}
        </div>
        <div className={`${styles.secondRow} d-f gap-1`}>
          {personalInputs.slice(2, 4).map((input) => (
            <TextInput
              key={input.name}
              {...input}
              errorMessage={errors[input.name]}
              value={updateData[input.name] ?? userData[input.name]}
              onChange={(value, name) =>
                onChange(name, value, input.required, input.type)
              }
            />
          ))}
        </div>
      </form>

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
        <LibButton label="Save" onSubmit={onSave} padding="0" />
      </div>
    </div>
  );
};

export default PersonalDataTab;
