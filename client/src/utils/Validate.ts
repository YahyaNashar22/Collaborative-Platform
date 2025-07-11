import { multiSelectType } from "../interfaces/registerSignup";

export type FieldError = {
  [fieldName: string]: string;
};

export const Validate = (
  name: string,
  value: string | multiSelectType[],
  required: boolean = false,
  type: string = "text"
): string => {
  if (required) {
    if (type === "multiSelect") {
      if (!Array.isArray(value) || value.length === 0) {
        return "* This field is required";
      }
    } else if (type === "file") {
      if (
        !(value instanceof File) &&
        (!Array.isArray(value) || value.length === 0)
      ) {
        return "* This file is required";
      }
    } else if (typeof value === "string" && !value.trim()) {
      return "* This field is required";
    }
  }

  if (type === "email" && typeof value === "string") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "* Please enter a valid email";
  }

  if (name === "phone" && typeof value === "string") {
    const onlyDigits = value.replace(/\D/g, "");
    if (onlyDigits.length < 8) {
      return "* Please enter a valid phone number";
    }
  }

  return "";
};
