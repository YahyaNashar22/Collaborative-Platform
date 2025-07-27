import { multiSelectType } from "../interfaces/registerSignup";

export type FieldError = {
  [fieldName: string]: string;
};

export const Validate = (
  name: string,
  value: string | multiSelectType[] | File | File[] | Date,
  required: boolean = false,
  type: string = "text",
  isFutureDate: boolean = false
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

  if (isFutureDate) {
    const inputDate = new Date(value);
    const today = new Date();
    if (inputDate <= today) {
      return "* Date must be after today";
    }
  }

  if (name === "phone" && typeof value === "string") {
    const onlyDigits = value.replace(/\D/g, "");
    if (onlyDigits.length < 8) {
      return "* Please enter a valid phone number";
    }
  }

  if (name === "budget") {
    const numericRegex = /^[0-9]*$/;
    if (!numericRegex.test(value)) {
      return "* Budget must be a valid number with no letters or symbols.";
    }
  }

  return "";
};
