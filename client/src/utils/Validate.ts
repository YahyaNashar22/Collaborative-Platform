import { isValidPhoneNumber } from "libphonenumber-js";

export type FieldError = {
  [fieldName: string]: string;
};

export const Validate = (
  name: string,
  value: string,
  required: boolean = false,
  type: string = "text"
): string => {
  if (required && !value.trim()) {
    return "* This field is required";
  }

  if (type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "* Please enter a valid email";
  }

  if (name === "confirmPassword") {
    return "";
  }

  if (name === "phoneNumber") {
    if (!isValidPhoneNumber(value.trim())) {
      return "* Please enter a valid international phone number";
    }
  }

  return ""; // no error
};
