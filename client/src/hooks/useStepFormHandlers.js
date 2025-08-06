// hooks/useStepFormHandlers.ts
import { useState } from "react";
import { Validate } from "../utils/Validate";
import useFormStore from "../store/FormsStore";
export const useStepFormHandlers = (role, type) => {
    const { getFormValues, updateFieldValue } = useFormStore();
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const fieldValues = getFormValues(role, type);
    const handleChange = (name, value, required) => {
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
        if ((name === "password" || name === "confirmPassword") &&
            touchedFields["confirmPassword"]) {
            const password = name === "password" ? value : fieldValues["password"];
            const confirmPassword = name === "confirmPassword" ? value : fieldValues["confirmPassword"];
            const confirmError = typeof confirmPassword === "string" &&
                typeof password === "string" &&
                confirmPassword !== password
                ? "* Passwords do not match"
                : "";
            setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
        }
    };
    const handleBlur = (name, value, required, type) => {
        setTouchedFields((prev) => ({ ...prev, [name]: true }));
        const error = Validate(name, value ?? "", required, type);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };
    const validateStep = (fields) => {
        const newErrors = {};
        const newTouched = {};
        fields.forEach((field) => {
            const value = fieldValues[field.name] || (field.type === "multiSelect" ? [] : "");
            const error = Validate(field.name, value, field.required || false, field.type);
            if (error) {
                newErrors[field.name] = error;
                newTouched[field.name] = true;
            }
        });
        if ("password" in fieldValues && "confirmPassword" in fieldValues) {
            const password = fieldValues["password"];
            const confirmPassword = fieldValues["confirmPassword"];
            if (typeof password === "string" &&
                typeof confirmPassword === "string" &&
                password !== confirmPassword) {
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
