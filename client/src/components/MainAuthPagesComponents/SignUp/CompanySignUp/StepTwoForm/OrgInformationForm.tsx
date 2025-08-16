import {
  FormField,
  FormStepData,
} from "../../../../../interfaces/registerSignup";
import LibButton from "../../../../../libs/common/lib-button/LibButton";
import TextInput from "../../../../../libs/common/lib-text-input/TextInput";

import styles from "./OrgInformationForm.module.css";
import useFormStore from "../../../../../store/FormsStore";
import SelectInput from "../../../../../libs/common/lib-select-input/SelectInput";
import FileInput from "../../../../../libs/common/lib-file-input/FileInput";
import TextAreaInput from "../../../../../libs/common/lib-textArea/TextAreaInput";
import { getStringValue } from "../../../../../utils/CastToString";
import { useStepFormHandlers } from "../../../../../hooks/useStepFormHandlers";

type OrgInformationFormViewProps = {
  data: FormStepData;
  title: string;

  moveForward: () => void;
  moveBackward: () => void;
};

const OrgInformationForm = ({
  data,
  title,
  moveForward,
  moveBackward,
}: OrgInformationFormViewProps) => {
  const { role, type } = useFormStore();

  const { fieldValues, errors, handleChange, handleBlur, validateStep } =
    useStepFormHandlers(role, type);

  const onNext = () => {
    const hasError = validateStep(data.form);
    if (Object.keys(hasError).length > 0) return;
    moveForward();
  };

  fieldValues;

  return (
    <div className={`${styles.formContainer} d-f f-dir-col`}>
      <h1 className="purple">{title}</h1>
      <form className={`${styles.form} d-f f-dir-col `}>
        {data.form.slice(0, 3).map((field: FormField, index: number) => {
          return (
            <div key={index}>
              {field.type === "aria" ? (
                <TextAreaInput
                  label={field.label}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={getStringValue(fieldValues[field.name])}
                  required={field.required || false}
                  onChange={(value, name) =>
                    handleChange(name, value, field.required || false)
                  }
                  onBlur={() =>
                    handleBlur(
                      field.name,
                      getStringValue(fieldValues[field.name]),
                      field.required || false,
                      field.type
                    )
                  }
                />
              ) : (
                <TextInput
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={getStringValue(fieldValues[field.name])}
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
              )}
            </div>
          );
        })}
        <div className={`${styles.firstRow} d-f w-100`} style={{ gap: "20px" }}>
          {data.form.slice(3, 5).map((field: FormField, index: number) => (
            <div key={index}>
              <SelectInput
                label={field.label}
                name={field.name}
                type={field.type}
                value={fieldValues[field.name]}
                required={field.required}
                placeholder={field.placeholder}
                options={field.options || []}
                onChange={(value) =>
                  handleChange(field.name, value, field.required || false)
                }
                errorMessage={errors[field.name]}
              />
            </div>
          ))}
        </div>
        {data.form.slice(5).map((field: FormField, index: number) => {
          return (
            <div key={index}>
              <FileInput
                label={field.label}
                placeholder={field.placeholder}
                name={field.name}
                value={fieldValues[field.name]}
                required={field.required || false}
                onChange={(value, name) =>
                  handleChange(name, value, field.required || false)
                }
                errorMessage={errors[field.name]}
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

export default OrgInformationForm;
