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

    if (
      (name === "password" || name === "confirmPassword") &&
      touchedFields["confirmPassword"]
    ) {
      const password = name === "password" ? value : fieldValues["password"];
      const confirmPassword =
        name === "confirmPassword" ? value : fieldValues["confirmPassword"];

      const confirmError =
        typeof confirmPassword === "string" &&
        typeof password === "string" &&
        confirmPassword !== password
          ? "* Passwords do not match"
          : "";

      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }

    if (
      (name === "email" || name === "recoveryEmail") &&
      touchedFields["recoveryEmail"]
    ) {
      const mainEmail = (name === "email" ? value : fieldValues["email"])
        ?.toString()
        .trim()
        .toLowerCase();
      const recoveryEmail = (
        name === "recoveryEmail" ? value : fieldValues["recoveryEmail"]
      )
        ?.toString()
        .trim()
        .toLowerCase();

      const recoveryError =
        mainEmail && recoveryEmail && mainEmail === recoveryEmail
          ? "* Recovery email must be different from your main email"
          : "";

      setErrors((prev) => ({ ...prev, recoveryEmail: recoveryError }));
    }
  };

  const handleBlur = (
    name: string,
    value: string,
    required: boolean,
    type: string
  ) => {
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    let error = Validate(name, value ?? "", required, type);

    if (name === "recoveryEmail") {
      const mainEmail = fieldValues["email"]?.toString().trim().toLowerCase();
      const recoveryEmail = value.trim().toLowerCase();
      if (mainEmail && recoveryEmail && mainEmail === recoveryEmail) {
        error = "* Recovery email must be different from your main email";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateStep = (fields: FormField[]) => {
    const newErrors: Errors = {};
    const newTouched: Touched = {};

    fields.forEach((field) => {
      const value =
        fieldValues[field.name] || (field.type === "multiSelect" ? [] : "");
      let error = Validate(
        field.name,
        value,
        field.required || false,
        field.type
      );

      if (field.name === "recoveryEmail") {
        const mainEmail = fieldValues["email"]?.toString().trim().toLowerCase();
        const recoveryEmail = value?.toString().trim().toLowerCase();
        if (mainEmail && recoveryEmail && mainEmail === recoveryEmail) {
          error = "* Recovery email must be different from your main email";
        }
      }

      if (error) {
        newErrors[field.name] = error;
        newTouched[field.name] = true;
      }
    });

    if ("password" in fieldValues && "confirmPassword" in fieldValues) {
      const password = fieldValues["password"];
      const confirmPassword = fieldValues["confirmPassword"];
      if (
        typeof password === "string" &&
        typeof confirmPassword === "string" &&
        password !== confirmPassword
      ) {
        newErrors["confirmPassword"] = "* Passwords do not match";
        newTouched["confirmPassword"] = true;
      }
    }

    setErrors(newErrors);
    setTouchedFields((prev) => ({ ...prev, ...newTouched }));

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
