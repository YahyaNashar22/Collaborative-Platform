import { multiSelectType } from "../interfaces/registerSignup";

export type FieldError = {
  [fieldName: string]: string;
};

export const Validate = (
  name: string,
  value: string | multiSelectType[] | File | File[] | Date,
  required: boolean = false,
  type: string = "text",
  isFutureDate: boolean = false,
  isLogin: boolean = false
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
    if (typeof value === "string" || value instanceof Date) {
      const inputDate = new Date(value);
      const today = new Date();
      if (inputDate <= today) {
        return "* Date must be after today";
      }
    }
  }

  if (type === "file") {
    const maxFileSize = 10 * 1024 * 1024;
    const files = Array.isArray(value)
      ? value.filter((item): item is File => item instanceof File)
      : value instanceof File
        ? [value]
        : [];

    if (files.some((file) => file.size > maxFileSize)) {
      return "* File size must be 10 MB or less";
    }
  }

  if (name === "phone" && typeof value === "string") {
    const onlyDigits = value.replace(/\D/g, "");
    const plusCount = (value.match(/\+/g) || []).length;
    if (plusCount > 1) {
      return "* Phone number cannot contain more than one '+' sign";
    }

    // Check for length
    if (onlyDigits.length < 8) {
      return "* Please enter a valid phone number";
    }
  }

  if (!isLogin && (name === "password" || name === "newPassword")) {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (typeof value === "string" && !strongPasswordRegex.test(value)) {
      return "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    }
  }

  if (name === "budget" && typeof value === "string") {
    const numericRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (value.trim() && !numericRegex.test(value.trim())) {
      return "* Budget must be a valid number.";
    }
  }

  return "";
};
