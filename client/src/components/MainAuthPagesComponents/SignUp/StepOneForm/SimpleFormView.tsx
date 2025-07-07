import { useState } from "react";
import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import styles from "./SimpleFormView.module.css";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import useFormStore from "../../../../store/FormsStore";

import { FormField, FormStepData } from "../../../../interfaces/registerSignup";
import { useStepFormHandlers } from "../../../../hooks/useStepFormHandlers";
import { getStringValue } from "../../../../utils/CastToString";

type SimpleFormViewProps = {
  data: FormStepData;
  title: string;
  error?: string;
  moveForward: () => void;
};

const SimpleFormView = ({
  data,
  title,
  moveForward,
  error,
}: SimpleFormViewProps) => {
  const { role, type } = useFormStore();
  const { fieldValues, errors, handleChange, handleBlur, validateStep } =
    useStepFormHandlers(role, type);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePasswordVisibility = () => setIsShowPassword((prev) => !prev);

  const onNext = () => {
    const hasError = validateStep(data.form);

    if (Object.keys(hasError).length > 0) return;

    moveForward();
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
                    getStringValue(fieldValues[field.name]),
                    field.required || false,
                    field.type
                  )
                }
              />
            </div>
          ))}
        </div>

        {data.form.slice(2).map((field: FormField, index: number) => {
          const isPasswordField =
            field.name === "password" || field.name === "confirmPassword";

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
                isShowPassword={isPasswordField ? isShowPassword : undefined}
                toggleShowPassword={
                  isPasswordField ? togglePasswordVisibility : undefined
                }
                errorMessage={errors[field.name]}
                onBlur={() =>
                  handleBlur(
                    field.name,
                    getStringValue(fieldValues[field.name]),
                    field.required || false,
                    field.type
                  )
                }
              />
            </div>
          );
        })}
      </form>
      {error && (
        <small className={`${styles.errorMsg} d-f align-center error`}>
          {error}
        </small>
      )}
      <div className={`${styles.buttons} d-f align-center justify-end`}>
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

export default SimpleFormView;
