import { useState } from "react";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import styles from "./ForgetPasswordComponent.module.css";
import { Validate } from "../../../../utils/Validate";

interface ForgetPasswordComponentType {
  moveBackward: () => void;
  onReset: () => void;
}
const ForgetPasswordComponent = ({
  moveBackward,
  onReset,
}: ForgetPasswordComponentType) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    email: "",
  });
  const [touchedFields, setTouchedFields] = useState<{
    [key: string]: boolean;
  }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (name: string, value: string, required: boolean) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (touchedFields[name]) {
      const error = Validate(name, value, required, "email");
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
    <div className={styles.wrapper}>
      <div className="d-f f-dir-col">
        <div className={`${styles.formContainer} d-f f-dir-col`}>
          <form className={`${styles.form} d-f f-dir-col`}>
            <div>
              <TextInput
                label="Email Address"
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValues.email}
                required={true}
                maxLength={30}
                minLength={10}
                onChange={(value, name) => handleChange(name, value, true)}
                errorMessage={errors.email}
                onBlur={() =>
                  handleBlur("email", formValues.email || "", true, "email")
                }
              />
            </div>
          </form>
          <div className={`${styles.buttons} d-f align-center justify-end`}>
            <LibButton
              label="Back"
              onSubmit={moveBackward}
              backgroundColor="#57417e"
              hoverColor="#49356a"
              padding="0 35.7px"
            />

            <LibButton
              label="Reset Password"
              onSubmit={onReset}
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

export default ForgetPasswordComponent;
