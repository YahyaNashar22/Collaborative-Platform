import useFormStore from "../../../../../store/FormsStore";
import {
  FormField,
  FormStepData,
} from "../../../../../interfaces/registerSignup";
import { useStepFormHandlers } from "../../../../../hooks/useStepFormHandlers";
import FileInput from "../../../../../libs/common/lib-file-input/FileInput";
import LibButton from "../../../../../libs/common/lib-button/LibButton";
import styles from "./DocumentsForm.module.css";
import { useState } from "react";

type DocumentsFormViewProps = {
  data: FormStepData;
  title: string;
  moveForward: () => void;
  moveBackward: () => void;
};

const DocumentsForm = ({
  data,
  title,
  moveForward,
  moveBackward,
}: DocumentsFormViewProps) => {
  const [drilledInput, setDrilledInput] = useState<boolean>(false);
  const { role, type } = useFormStore();

  const { fieldValues, errors, handleChange, handleBlur, validateStep } =
    useStepFormHandlers(role, type);

  const onNext = () => {
    const hasError = validateStep(data.form);
    if (Object.keys(hasError).length > 0) return;

    moveForward();
  };

  return (
    <div className={`${styles.formContainer} d-f f-dir-col`}>
      <h1 className="purple">{title}</h1>
      <form className={`${styles.form} d-f f-dir-col`}>
        <div className={`${styles.firstRow} d-f w-100`} style={{ gap: "20px" }}>
          {data.form.slice(0, 2).map((field: FormField, index: number) => (
            <div key={index}>
              <FileInput
                label={field.label}
                // value={fieldValues[field.name]}
                placeholder={field.placeholder}
                name={field.name}
                required={field.required || false}
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

        {data.form.slice(2).map((field: FormField, index: number) => (
          <div key={index}>
            <FileInput
              label={field.label}
              placeholder={field.placeholder}
              name={field.name}
              value={fieldValues[field.name]}
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
          hoverColor="#6c46d9"
          padding="0 20px"
        />
      </div>
    </div>
  );
};

export default DocumentsForm;
