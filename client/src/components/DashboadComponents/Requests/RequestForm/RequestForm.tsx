// @ts-nocheck

import { useState } from "react";
import styles from "./RequestForm.module.css";
import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import FileInput from "../../../../libs/common/lib-file-input/FileInput";
import TextAreaInput from "../../../../libs/common/lib-textArea/TextAreaInput";
import { Validate } from "../../../../utils/Validate";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import { RequestDataType } from "../../../../interfaces/request";
import RequestDropdown from "./components/RequestDropdown";
import { downloadFile } from "../../../../services/FileUpload";

type FormField = {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  hasCurrency?: boolean;
  errorMessage?: string;
};

type ErrorFields = {
  title: string;
  description: string;
  serviceId: string;
  requestFiles: string;
  offerDeadline: string;
  projectDeadline: string;
  budget: string;
  [key: string]: string;
};

interface RequestFormType {
  data: FormField[];
  moveBackward: () => void;
  onSubmit: (formData: RequestDataType) => void;
}

const RequestForm = ({ moveBackward, onSubmit, data }: RequestFormType) => {
  const [formValues, setFormValues] = useState<RequestDataType>({
    title: "",
    serviceId: "",
    description: "",
    requestFiles: [],
    offerDeadline: "",
    projectDeadline: "",
    budget: "",
  });

  const [errors, setErrors] = useState<ErrorFields>({
    title: "",
    description: "",
    serviceId: "",
    requestFiles: "",
    offerDeadline: "",
    projectDeadline: "",
    budget: "",
  });

  const resetForm = () => {
    setFormValues({
      title: "",
      serviceId: "",
      description: "",
      requestFiles: [],
      offerDeadline: "",
      projectDeadline: "",
      budget: "",
    });
    setErrors({
      title: "",
      serviceId: "",
      description: "",
      requestFiles: "",
      offerDeadline: "",
      projectDeadline: "",
      budget: "",
    });
  };

  const handleChange = (
    name: string,
    value: string,
    isRequired: boolean,
    type: string,
  ) => {
    let customError = "";

    if (
      (name === "offerDeadline" || name === "projectDeadline") &&
      formValues.offerDeadline &&
      formValues.projectDeadline
    ) {
      const offerDate = new Date(
        name === "offerDeadline" ? value : formValues.offerDeadline,
      );
      const projectDate = new Date(
        name === "projectDeadline" ? value : formValues.projectDeadline,
      );

      if (offerDate > projectDate) {
        customError =
          "Offer deadline must be before or equal to project deadline.";
      }
    }

    const validationError = Validate(
      name,
      value,
      isRequired,
      type,
      type === "date",
    );

    setErrors((prev) => ({
      ...prev,
      [name]: customError || validationError,
    }));

    if (name === "requestFiles" && value instanceof File) {
      setFormValues((prev) => ({
        ...prev,
        requestFiles: [...(prev.requestFiles || []), value],
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    let isValid = true;
    const newErrors = { ...errors };

    data.forEach((field: FormField) => {
      const value = formValues[field.name];
      const error = Validate(
        field.name,
        value as any,
        field.required ?? false,
        field.type,
        field.type === "date",
      );

      newErrors[field.name] = error;
      if (error) isValid = false;
    });

    if (formValues.offerDeadline && formValues.projectDeadline) {
      const offerDate = new Date(formValues.offerDeadline);
      const projectDate = new Date(formValues.projectDeadline);

      if (offerDate > projectDate) {
        newErrors.offerDeadline = t(
          "Offer deadline must be before or equal to project deadline.",
        );

        newErrors.projectDeadline = t(
          "Project deadline must be after or equal to offer deadline.",
        );
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      onSubmit(formValues);
      resetForm();
    }
  };

  const handleSelectService = (selectedService: string) => {
    setFormValues((prev) => ({ ...prev, serviceId: selectedService }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{t("Create New request")}</h1>
      </div>
      <form className={`${styles.form} d-f f-dir-col`}>
        {data.map((input, index: number) => {
          if (input.type === "file") {
            return (
              <>
                <FileInput
                  key={index}
                  {...input}
                  value={formValues[input.name] as any}
                  onChange={(value, name) =>
                    handleChange(
                      name,
                      value as any,
                      input.required as any,
                      input.type,
                    )
                  }
                  errorMessage={errors[input.name]}
                />
                <ul className={styles.uploadedList}>
                  {(formValues.requestFiles as File[])?.map((file, i) => (
                    <li key={i} className={styles.uploadedItem}>
                      <div className={styles.fileDetails}>
                        <span className={styles.fileName}>{file.name}</span>
                      </div>
                      <div
                        className={`${styles.downloadLink} pointer`}
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadFile(file.name);
                        }}
                      >
                        ⬇ {t("Download")}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            );
          } else if (input.type === "textarea") {
            return (
              <TextAreaInput
                key={index}
                {...input}
                value={formValues[input.name] as any}
                required={input.required ?? false}
                onChange={(value, name) =>
                  handleChange(name, value, input.required ?? false, input.type)
                }
                errorMessage={errors[input.name]}
              />
            );
          } else if (input.type === "searchableSelect") {
            return (
              <div className={`${styles.container} d-f f-wrap f-dir-col`}>
                <label className="bold">
                  {t("Pick a Service")} <span>*</span>
                </label>
                <div className="d-f f-wrap gap-05">
                  <RequestDropdown emitSelectedService={handleSelectService} />
                </div>
                {errors.serviceId && (
                  <small className="error">{t("* This field is required")}</small>
                )}
              </div>
            );
          } else {
            return (
              <TextInput
                key={index}
                {...input}
                value={formValues[input.name] as any}
                required={input.required ?? false}
                onChange={(value, name) =>
                  handleChange(name, value, input.required ?? false, input.type)
                }
                errorMessage={errors[input.name]}
              />
            );
          }
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
          label="Submit"
          onSubmit={handleSubmit}
          backgroundColor="#825beb"
          hoverColor="#6c46d9"
          padding="0 20px"
        />
      </div>
    </div>
  );
};

export default RequestForm;
