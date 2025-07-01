// hooks/useStepFormHandlers.ts
import { useState } from "react";
import { Validate } from "../utils/Validate";
import useFormStore from "../store/FormsStore";
import { FormField, multiSelectType } from "../interfaces/registerSignup";

type Errors = { [key: string]: string };
type Touched = { [key: string]: boolean };

export const useStepFormHandlers = (role: string, type: string) => {
  const { getFormValues, updateFieldValue } = useFormStore();
  const [errors, setErrors] = useState<Errors>({});
  const [touchedFields, setTouchedFields] = useState<Touched>({});
  const fieldValues = getFormValues(role, type);

  const handleChange = (
    name: string,
    value: string | multiSelectType[],
    required: boolean
  ) => {
    updateFieldValue(role, type, name, value);

    if (touchedFields[name]) {
      const fieldType = Array.isArray(value)
        ? "multiSelect"
        : typeof value === "string"
        ? "text"
        : "";
      const error = Validate(name, value, required, fieldType);
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
    const error = Validate(name, value ?? "", required, type);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateStep = (fields: FormField[]) => {
    const newErrors: Errors = {};
    const newTouched: Touched = {};

    fields.forEach((field) => {
      const value =
        fieldValues[field.name] || (field.type === "multiSelect" ? [] : "");
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
    console.log(fieldValues);
    return newErrors;
  };

  return {
    fieldValues,
    errors,
    touchedFields,
    handleChange,
    handleBlur,
    validateStep,
  };
};
