import { useState } from "react";
import { registerFormData } from "../../../data/registerFormData";
import { BankDataProps } from "../../../interfaces/Profile";
import { FormField } from "../../../interfaces/registerSignup";
import LibButton from "../../../libs/common/lib-button/LibButton";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./BankData.module.css";
import { Validate } from "../../../utils/Validate";

const BankData = ({
  userData,
  onCancel,
  onSave,
  isViewer = false,
}: BankDataProps) => {
  const [updatedData, setUpdatedData] = useState({});
  const [errors, setErrors] = useState({});

  const fields: FormField[] =
    registerFormData.roles.provider.types.default.formData[3].form;

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
        <div className={`${styles.firstRow} d-f w-100`} style={{ gap: "20px" }}>
          {fields.slice(0, 2).map((field: FormField, index: number) => (
            <div key={index} style={{ flex: 1 }}>
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
        </div>

        {fields.slice(2).map((field: FormField, index: number) => (
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
            label="Reset"
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

export default BankData;
