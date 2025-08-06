import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./RequestDropdown.module.css";
import { getAllServices } from "../../../../../services/ServiceServices";
const RequestDropdown = ({ emitSelectedService }) => {
    const [serviceOptions, setServiceOptions] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [loading, setLoading] = useState(false);
    const customStyles = {
        container: (provided) => ({
            ...provided,
            width: "100%",
        }),
        control: (base) => ({
            ...base,
            width: "100%",
            borderColor: "#ccc",
            boxShadow: "none",
            outline: "none",
            "&:hover": {
                borderColor: "#ccc",
            },
        }),
        placeholder: (base) => ({
            ...base,
            fontSize: "12px",
        }),
        option: (base, state) => ({
            ...base,
            fontSize: "12px",
            backgroundColor: state.isSelected
                ? "#825beb"
                : state.isFocused
                    ? "#f0f0f0"
                    : "#fff",
            color: state.isSelected ? "#fff" : "#333",
            "&:active": {
                backgroundColor: "#6c46d9",
            },
        }),
        menu: (base) => ({
            ...base,
            boxShadow: "none",
            border: "1px solid #ccc",
            fontSize: "12px",
        }),
        singleValue: (base) => ({
            ...base,
            fontSize: "12px",
            color: "#333",
        }),
    };
    const fetchServices = async () => {
        setLoading(true);
        try {
            const result = await getAllServices();
            const options = result.map((service) => ({
                value: service._id,
                label: service.name,
            }));
            setServiceOptions(options);
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchServices();
    }, []);
    const handleChange = (selected) => {
        if (selected) {
            setSelectedRequest(selected);
            emitSelectedService(selected.value);
        }
        else {
            setSelectedRequest(null);
            emitSelectedService("");
        }
    };
    return (_jsx("div", { className: styles.container, children: _jsx(Select, { options: serviceOptions, onChange: handleChange, isSearchable: true, placeholder: loading ? "Loading..." : "Select a request...", value: selectedRequest, styles: customStyles, isLoading: loading }) }));
};
export default RequestDropdown;
