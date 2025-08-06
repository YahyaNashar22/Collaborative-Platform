import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import styles from "./CompanyData.module.css";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import LibButton from "../../../libs/common/lib-button/LibButton";
import { registerFormData } from "../../../data/registerFormData";
import TextAreaInput from "../../../libs/common/lib-textArea/TextAreaInput";
import SelectInput from "../../../libs/common/lib-select-input/SelectInput";
import { getAllServices } from "../../../services/ServiceServices";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import { Validate } from "../../../utils/Validate";
const fields = registerFormData.roles.provider.types.default.formData[1].form;
const CompanyDataTab = ({ userData, onCancel, onSave, isViewer = false, }) => {
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    const [errors, setErrors] = useState({});
    const fetchServices = async () => {
        setLoading(true);
        try {
            const result = await getAllServices();
            const transformedServices = result.map((service) => ({
                id: service._id,
                value: service._id,
                label: service.name,
            }));
            const selected = (userData.services || []).map((service) => ({
                id: service._id,
                value: service._id,
                label: service.name,
            }));
            const unselectedOptions = transformedServices.filter((opt) => !selected.find((sel) => sel.id === opt.id));
            setServices(unselectedOptions);
            setSelectedServices(selected);
            toast.error(error?.response?.data?.message || "Error fetching services");
        }
        finally {
            setLoading(false);
        }
    };
    const handleChange = (name, value, required, type) => {
        if (value === userData[name]) {
            setUpdatedData((prev) => {
                const newData = { ...prev };
                delete newData[name];
                return newData;
            });
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
            return;
        }
        setUpdatedData((prev) => ({ ...prev, [name]: value }));
        const error = Validate(name, value, required, type);
        setErrors((prev) => {
            const newErrors = { ...prev };
            if (error)
                newErrors[name] = error;
            else
                delete newErrors[name];
            return newErrors;
        });
    };
    const handleSave = () => {
        console.log("errors: ", errors);
        console.log(updatedData);
        if (Object.keys(errors).length === 0)
            onSave(updatedData);
    };
    useEffect(() => {
        if (services.length === 0)
            fetchServices();
    }, []);
    console.log(userData.services);
    return (_jsxs("div", { className: styles.companyDataTab, children: [_jsxs("form", { className: `${styles.form} d-f f-dir-col `, children: [fields.slice(0, 5).map((field, index) => {
                        return (_jsx("div", { children: field.type === "aria" ? (_jsx(TextAreaInput, { label: field.label, placeholder: field.placeholder, name: field.name, value: updatedData[field.name] ?? userData[field.name] ?? "", required: field.required || false, onChange: (value, name) => handleChange(name, value, field.required || false, field.type), disabled: isViewer })) : (_jsx(TextInput, { label: field.label, type: field.type, placeholder: field.placeholder, name: field.name, value: updatedData[field.name] ?? userData[field.name] ?? "", required: field.required || false, maxLength: Number(field.maxLength), minLength: Number(field.minLength), min: Number(field.minLength), onChange: (value, name) => handleChange(name, value, field.required || false, field.type), errorMessage: errors[field.name], disabled: isViewer })) }, index));
                    }), _jsx("div", { className: `${styles.firstRow} d-f w-100`, style: { gap: "20px" }, children: fields.slice(5, 7).map((field, index) => (_jsx("div", { style: { flex: 1 }, children: _jsx(SelectInput, { label: field.label, name: field.name, type: field.type, value: updatedData[field.name] ?? userData[field.name] ?? "", required: field.required, placeholder: field.placeholder, options: field.options || [], onChange: (value) => handleChange(field.name, value, field.required || false, field.type), errorMessage: errors[field.name], disabled: isViewer }) }, index))) }), fields.slice(7).map((field, index) => (_jsxs("div", { style: { flex: 1 }, children: [_jsxs("label", { className: "bold", children: ["Pick a Service ", _jsx("span", { className: "error", children: "*" })] }), _jsx(Multiselect, { options: services, selectedValues: [], onSelect: (items) => {
                                    setSelectedServices(items);
                                    const newServiceIds = items.map((item) => item.id);
                                    handleChange("services", newServiceIds, true, "multiselect");
                                }, onRemove: (items) => {
                                    setSelectedServices(items);
                                    handleChange("services", items.map((item) => item.id), true, "multiselect");
                                }, disable: loading || isViewer, displayValue: "label", placeholder: "Select services", className: `multiSelect pointer ${errors["services"] && "specialError"}` }), _jsx("div", { className: styles.tags, children: userData?.services.map((item) => (_jsxs("div", { className: styles.tag, children: [item.name, _jsx("span", { className: styles.locked, children: "\uD83D\uDD12" })] }, item.value))) })] }, index)))] }), !isViewer && (_jsxs("div", { className: `${styles.buttons} d-f align-center justify-between`, children: [_jsx(LibButton, { label: "Cancel", onSubmit: onCancel, outlined: true, color: "var(--deep-purple)", hoverColor: "#8563c326", padding: "0" }), _jsx(LibButton, { label: "Save", onSubmit: handleSave, padding: "0" })] }))] }));
};
export default CompanyDataTab;
