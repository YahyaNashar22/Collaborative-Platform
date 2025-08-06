import { useState } from "react";
import { registerFormData } from "../../../data/registerFormData";
import { AddressDataProps } from "../../../interfaces/Profile";
import { FormField } from "../../../interfaces/registerSignup";
import LibButton from "../../../libs/common/lib-button/LibButton";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./AddressData.module.css";
import { Validate } from "../../../utils/Validate";

const AddressData = ({
  userData,
  onCancel,
  onSave,
  isViewer = false,
}: AddressDataProps) => {
  const [updatedData, setUpdatedData] = useState({});
  const [errors, setErrors] = useState({});

  const fields: FormField[] =
    registerFormData.roles.provider.types.default.formData[2].form;

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
    console.log(name, value);
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
    console.log("errors: ", errors);
    console.log(updatedData);
    if (Object.keys(errors).length === 0) onSave(updatedData);
  };

  return (
    <div className={`${styles.formContainer} d-f f-dir-col`}>
      <form className={`${styles.form} d-f f-dir-col `}>
        {fields.map((field: FormField, index: number) => (
          <div key={index}>
            <TextInput
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              value={updatedData[field.name] ?? userData[field.name] ?? ""}
              required={field.required || false}
              minLength={Number(field.minLength)}
              onChange={(value, name) =>
                handleChange(name, value, field.required || false, field.type)
              }
              errorMessage={errors[field.name]}
              disabled={isViewer}
            />
          </div>
        ))}
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
          <LibButton
            label="Next"
            onSubmit={handleSave}
            backgroundColor="#825beb"
            hoverColor="#6c46d9"
            padding="0"
          />
        </div>
      )}
    </div>
  );
};

export default AddressData;
