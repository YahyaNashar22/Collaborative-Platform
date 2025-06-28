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
    const onlyDigits = value.replace(/\D/g, "");
    if (onlyDigits.length < 8) {
      return "* Please enter a valid phone number";
    }
  }

  return "";
};
