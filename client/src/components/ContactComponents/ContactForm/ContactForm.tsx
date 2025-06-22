import { useState } from "react";
import LibButton from "../../../libs/common/lib-button/libButton";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import TextAreaInput from "../../../libs/common/lib-textArea/TextAreaInput";
import styles from "./ContactForm.module.css";

interface formType {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  required: boolean;
  onChange: (value: string, name: string) => void;
}
const ContactForm = () => {
  const [disabledBtn, setDisabledBtn] = useState(true);

  const [formData, setFormData] = useState({
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
      type: "text",
      required: true,
      onChange: (value: string, name: string) => {
        console.log(`Changed ${name}:`, value);
      },
    },
    {
      label: "Last Name",
      placeholder: "Last Name",
      name: "lastName",
      type: "text",
      required: true,
      onChange: (value: string, name: string) => {
        console.log(`Changed ${name}:`, value);
      },
    },
    {
      label: "Email Address",
      placeholder: "Email Address",
      name: "email",
      type: "email",
      required: true,
      onChange: (value: string, name: string) => {
        console.log(`Changed ${name}:`, value);
      },
    },
    {
      label: "Phone Number",
      placeholder: "Phone Number",
      name: "phoneNumber",
      type: "text",
      required: true,
      onChange: (value: string, name: string) => {
        console.log(`Changed ${name}:`, value);
      },
    },
  ];

  const handleChange = (name: string, value: string) => {
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    const hasError = checkingValidation(updatedFormData);
    setDisabledBtn(hasError);
  };

  const checkingValidation = (data: typeof formData) => {
    return Object.entries(data).some(([key, value]) => {
      if (key.toLowerCase().includes("email")) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value);
      }
      console.log(value.length);
      return value.trim().length === 0;
    });
  };

  const handleCLick = () => {};

  return (
    <div className={`${styles.wrapper} d-f f-dir-col`}>
      <div className={`${styles.formWrapper} d-f f-dir-col align-start`}>
        <div>
          <h1 className="title">Get in Touch</h1>
          <small className={styles.description}>
            Fill up the form our team will get back to you within 24 Hours
          </small>
        </div>
        <form className={`${styles.form} d-f f-dir-col `}>
          <div className={`${styles.firstRow} d-f w-100`}>
            {formInputs.slice(0, 2).map((elem, index) => (
              <TextInput
                key={index}
                label={elem.label}
                type={elem.type}
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
            onChange={(value: string, name: string) =>
              handleChange(name, value)
            }
          />
          <LibButton disabled={disabledBtn} onSubmit={handleCLick} />
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
