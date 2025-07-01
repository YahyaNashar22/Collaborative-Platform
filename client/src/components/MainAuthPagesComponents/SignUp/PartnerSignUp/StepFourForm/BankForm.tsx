import { useState } from "react";
import useFormStore from "../../../../../store/FormsStore";
import { Validate } from "../../../../../utils/Validate";
import {
  FormField,
  FormStepData,
} from "../../../../../interfaces/registerSignup";
import TextInput from "../../../../../libs/common/lib-text-input/TextInput";
import LibButton from "../../../../../libs/common/lib-button/LibButton";
import styles from "./BankForm.module.css";

type SimpleFormViewProps = {
  data: FormStepData;
  title: string;
  moveForward: () => void;
  moveBackward: () => void;
};

const BankForm = ({
  data,
  title,
  moveForward,
  moveBackward,
}: SimpleFormViewProps) => {
  const { role, type, getFormValues, updateFieldValue } = useFormStore();
  const [touchedFields, setTouchedFields] = useState<{
    [key: string]: boolean;
  }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fieldValues = getFormValues(role, type);

  const onNext = () => {
    const hasError = onNextValidation();

    if (Object.keys(hasError).length > 0) return;

    moveForward();
  };

  const onNextValidation = () => {
    const newErrors: { [key: string]: string } = {};
    const newTouched: { [key: string]: boolean } = {};
    data.form.forEach((field) => {
      const value = fieldValues[field.name] || "";
      const error = Validate(
        field.name,
        value,
        field.required || false,
        field.type
      );
      if (error) {
        newErrors[field.name] = error;
        newTouched[field.name] = true;
      }
    });
    setErrors(newErrors);
    setTouchedFields((prev) => ({ ...prev, ...newTouched }));
    return newErrors;
  };

  const handleChange = (name: string, value: string, required: boolean) => {
    updateFieldValue(role, type, name, value);
    console.log(getFormValues(role, type));
    if (touchedFields[name]) {
      const error = Validate(name, value, required, type);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    name: string,
    value: string,
    required: boolean,
    type: string
  ) => {
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    const error = Validate(name, value, required, type);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <div className={`${styles.formContainer} d-f f-dir-col`}>
      <h1 className="purple">{title}</h1>
      <form className={`${styles.form} d-f f-dir-col `}>
        {/* Group First Name and Last Name */}
        <div className={`${styles.firstRow} d-f w-100`} style={{ gap: "20px" }}>
          {data.form.slice(0, 2).map((field: FormField, index: number) => (
            <div key={index}>
              <TextInput
                label={field.label}
                type={field.type}
                value={fieldValues[field.name] || ""}
                placeholder={field.placeholder}
                name={field.name}
                required={field.required || false}
                maxLength={Number(field.maxLength)}
                minLength={Number(field.minLength)}
                onChange={(value, name) =>
                  handleChange(name, value, field.required || false)
                }
                errorMessage={errors[field.name]}
                onBlur={() =>
                  handleBlur(
                    field.name,
                    fieldValues[field.name] || "",
                    field.required || false,
                    field.type
                  )
                }
              />
            </div>
          ))}
        </div>

        {data.form.slice(2).map((field: FormField, index: number) => {
          return (
            <div key={index}>
              <TextInput
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                value={fieldValues[field.name] || ""}
                required={field.required || false}
                maxLength={Number(field.maxLength)}
                minLength={Number(field.minLength)}
                onChange={(value, name) =>
                  handleChange(name, value, field.required || false)
                }
                errorMessage={errors[field.name]}
                onBlur={() =>
                  handleBlur(
                    field.name,
                    fieldValues[field.name] || "",
                    field.required || false,
                    field.type
                  )
                }
              />
            </div>
          );
        })}
      </form>
      <div className={`${styles.buttons} d-f align-center justify-end`}>
        <LibButton
          label="Back"
          onSubmit={moveBackward}
          backgroundColor="#57417e"
          hoverColor="#49356a"
          padding="0 20px"
        />

        <LibButton
          label="Next"
          onSubmit={onNext}
          backgroundColor="#825beb"
          hoverColor=" #6c46d9"
          padding="0 20px"
        />
      </div>
    </div>
  );
};

export default BankForm;
