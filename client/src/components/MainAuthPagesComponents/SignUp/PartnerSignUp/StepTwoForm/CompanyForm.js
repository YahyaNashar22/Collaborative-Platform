import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LibButton from "../../../../../libs/common/lib-button/LibButton";
import TextInput from "../../../../../libs/common/lib-text-input/TextInput";
import styles from "./CompanyForm.module.css";
import useFormStore from "../../../../../store/FormsStore";
import SelectInput from "../../../../../libs/common/lib-select-input/SelectInput";
import TextAreaInput from "../../../../../libs/common/lib-textArea/TextAreaInput";
import { getStringValue } from "../../../../../utils/CastToString";
import { useStepFormHandlers } from "../../../../../hooks/useStepFormHandlers";
import { useEffect, useState } from "react";
import { getAllServices } from "../../../../../services/ServiceServices";
const CompanyForm = ({ data, title, moveForward, moveBackward, }) => {
    const { role, type } = useFormStore();
    const { fieldValues, errors, handleChange, handleBlur, validateStep } = useStepFormHandlers(role, type);
    const [serviceOptions, setServiceOptions] = useState([]);
    const onNext = () => {
        const hasError = validateStep(data.form);
        if (Object.keys(hasError).length > 0)
            return;
        moveForward();
    };
    const fetchAllServices = async () => {
        try {
            const result = await getAllServices();
            const transformed = result.map((service) => ({
                label: service.name,
                value: service._id,
                id: service._id,
            }));
            setServiceOptions(transformed);
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
    };
    useEffect(() => {
        if (!serviceOptions.length)
            fetchAllServices();
    }, []);
    const formWithDynamicServices = {
        ...data,
        form: data.form.map((field) => {
            if (field.name === "services") {
                return {
                    ...field,
                    options: serviceOptions,
                };
            }
            return field;
        }),
    };
    return (_jsxs("div", { className: `${styles.formContainer} d-f f-dir-col`, children: [_jsx("h1", { className: "purple", children: title }), _jsxs("form", { className: `${styles.form} d-f f-dir-col `, children: [formWithDynamicServices.form
                        .slice(0, 5)
                        .map((field, index) => {
                        return (_jsx("div", { children: field.type === "aria" ? (_jsx(TextAreaInput, { label: field.label, placeholder: field.placeholder, name: field.name, value: getStringValue(fieldValues[field.name]), required: field.required || false, onChange: (value, name) => handleChange(name, value, field.required || false) })) : (_jsx(TextInput, { label: field.label, type: field.type, placeholder: field.placeholder, name: field.name, value: getStringValue(fieldValues[field.name]), required: field.required || false, maxLength: Number(field.maxLength), minLength: Number(field.minLength), min: Number(field.minLength), onChange: (value, name) => handleChange(name, value, field.required || false), errorMessage: errors[field.name], onBlur: () => handleBlur(field.name, getStringValue(fieldValues[field.name]), field.required || false, field.type) })) }, index));
                    }), _jsx("div", { className: `${styles.firstRow} w-100`, style: { gap: "20px" }, children: formWithDynamicServices.form
                            .slice(5, 7)
                            .map((field, index) => (_jsx("div", { children: _jsx(SelectInput, { label: field.label, name: field.name, type: field.type, value: fieldValues[field.name], required: field.required, placeholder: field.placeholder, options: field.options || [], onChange: (value, name) => handleChange(field.name, value, field.required || false), errorMessage: errors[field.name] }) }, index))) }), formWithDynamicServices.form
                        .slice(7)
                        .map((field, index) => (_jsx("div", { children: _jsx(SelectInput, { label: field.label, name: field.name, type: field.type, value: fieldValues[field.name], required: field.required, placeholder: field.placeholder, options: field.options || [], onChange: (value, name) => handleChange(field.name, value, field.required || false), onRemove: (items) => handleChange(field.name, items, field.required ?? false), errorMessage: errors[field.name] }) }, index)))] }), _jsxs("div", { className: `${styles.buttons} d-f align-center justify-end`, children: [_jsx(LibButton, { label: "Back", onSubmit: moveBackward, backgroundColor: "#57417e", hoverColor: "#49356a", padding: "0 20px" }), _jsx(LibButton, { label: "Next", onSubmit: onNext, backgroundColor: "#825beb", hoverColor: " #6c46d9", padding: "0 20px" })] })] }));
};
export default CompanyForm;
