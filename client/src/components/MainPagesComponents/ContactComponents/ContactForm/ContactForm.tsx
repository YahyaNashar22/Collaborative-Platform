import { useState } from "react";

import styles from "./ContactForm.module.css";
import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import TextAreaInput from "../../../../libs/common/lib-textArea/TextAreaInput";
import LibButton from "../../../../libs/common/lib-button/LibButton";

interface formType {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  type: string;
  required: boolean;
}

type formDataSTate = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  description: string;
};
const ContactForm = () => {
  const [formData, setFormData] = useState<formDataSTate>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    description: "",
  });
  const formInputs: formType[] = [
    {
      label: "First Name",
      placeholder: "First Name",
      name: "firstName",
      value: "",
      type: "text",
      required: true,
    },
    {
      label: "Last Name",
      placeholder: "Last Name",
      name: "lastName",
      value: "",
      type: "text",
      required: true,
    },
    {
      label: "Email Address",
      placeholder: "Email Address",
      name: "email",
      type: "email",
      value: "",
      required: true,
    },
    {
      label: "Phone Number",
      placeholder: "Phone Number",
      name: "phoneNumber",
      type: "text",
      value: "",
      required: true,
    },
  ];

  const handleChange = (name: string, value: string) => {
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    const hasError = checkingValidation(updatedFormData);
  };

  const checkingValidation = (data: typeof formData) => {
    return Object.entries(data).some(([key, value]) => {
      if (key.toLowerCase().includes("email")) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value);
      }
      return value.trim().length === 0;
    });
  };

  const handleCLick = () => {
    return;
  };

  return (
    <div className={`${styles.wrapper} d-f f-dir-col w-100`}>
      <div className={`${styles.formWrapper} d-f f-dir-col align-start`}>
        <div className="w-100">
          <h1 className="title">Get in Touch</h1>
          <small className={styles.description}>
            Fill up the form our team will get back to you within 24 Hours
          </small>
        </div>
        <form className={`${styles.form} d-f f-dir-col w-100`}>
          <div className={`${styles.firstRow} d-f w-100`}>
            {formInputs.slice(0, 2).map((elem, index) => (
              <TextInput
                key={index}
                label={elem.label}
                type={elem.type}
                value={formData[elem.name]}
                placeholder={elem.placeholder}
                name={elem.name}
                required={elem.required}
                onChange={(value: string, name: string) =>
                  handleChange(name, value)
                }
              />
            ))}
          </div>

          {formInputs.slice(2).map((elem, index) => (
            <TextInput
              key={index + 2}
              label={elem.label}
              type={elem.type}
              value={formData[elem.name]}
              placeholder={elem.placeholder}
              name={elem.name}
              required={elem.required}
              onChange={(value: string, name: string) =>
                handleChange(name, value)
              }
            />
          ))}
          <TextAreaInput
            label="Description"
            placeholder="Type here..."
            name="description"
            required={true}
            value={formData.description}
            onChange={(value: string, name: string) =>
              handleChange(name, value)
            }
          />
          <LibButton label="Submit" onSubmit={handleCLick} />
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
