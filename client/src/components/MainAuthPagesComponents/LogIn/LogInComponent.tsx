import { useState } from "react";
import styles from "./LoginComponent.module.css";
import { Validate } from "../../../utils/Validate";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import LibButton from "../../../libs/common/lib-button/LibButton";
import { ReactNode } from "react";

interface dataType {
  name: string;
  label: string;
  value: "";
  placeholder: string;
  type: string;
  maxLength: number;
  minLength?: number;
  required: boolean;
  errorMsg: string;
}

interface loginComponentType {
  onLogin: (data: { [key: string]: string }) => void;
  onForgetPassword: () => void;
  children?: ReactNode;
}

const LogInComponent = ({
  onLogin,
  onForgetPassword,
  children,
}: loginComponentType) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [touchedFields, setTouchedFields] = useState<{
    [key: string]: boolean;
  }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const data: dataType[] = [
    {
      name: "email",
      label: "Email",
      value: "",
      placeholder: "Email",
      type: "email",
      maxLength: 30,
      required: true,
      errorMsg: "* This Field is Required",
    },
    {
      name: "password",
      label: "password",
      value: "",
      placeholder: "password",
      type: "password",
      maxLength: 30,
      minLength: 5,
      required: true,
      errorMsg: "* This Field is Required",
    },
  ];

  const onSubmit = () => {
    const hasError = onNextValidation();
    if (Object.keys(hasError).length > 0) return;
    onLogin(formValues);
  };

  const onNextValidation = () => {
    const newErrors: { [key: string]: string } = {};
    const newTouched: { [key: string]: boolean } = {};

    data.forEach((field) => {
      const value = formValues[field.name] || "";
      const error = Validate(
        field.name,
        value,
        field.required,
        field.type,
        false,
        true
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
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (touchedFields[name]) {
      const error = Validate(
        name,
        value,
        required,
        data.find((f) => f.name === name)?.type || "",
        false,
        true
      );
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
    const error = Validate(name, value, required, type, false, true);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <div className={styles.wrapper}>
      <div className="d-f f-dir-col">
        <div className={`${styles.formContainer} d-f f-dir-col`}>
          <form className={`${styles.form} d-f f-dir-col`}>
            {data.map((field, index) => {
              return (
                <div key={index}>
                  <TextInput
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    name={field.name}
                    value={formValues[field.name] || ""}
                    required={field.required}
                    maxLength={field.maxLength}
                    minLength={field.minLength}
                    onChange={(value, name) =>
                      handleChange(name, value, field.required)
                    }
                    errorMessage={errors[field.name]}
                    onBlur={() =>
                      handleBlur(
                        field.name,
                        formValues[field.name] || "",
                        field.required,
                        field.type
                      )
                    }
                  />
                </div>
              );
            })}
          </form>
          {children}
          <div className={`${styles.buttons} d-f align-center justify-between`}>
            <small className="purple pointer bold" onClick={onForgetPassword}>
              Forgot password?
            </small>
            <LibButton
              label="Sign In"
              onSubmit={onSubmit}
              backgroundColor="#825beb"
              hoverColor="#6c46d9"
              padding="0 20px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInComponent;
