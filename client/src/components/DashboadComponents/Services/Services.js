import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Services.module.css";
import useDebounceSearch from "../../../hooks/useDebounceSearch";
import LibButton from "../../../libs/common/lib-button/LibButton";
import { createService, deleteService, getAllServices, } from "../../../services/ServiceServices";
import ServiceCardSkeleton from "../../../shared/ServiceSkeletonLoading/ServiceSkeletonLoading";
import ServiceForm from "./components/ServiceForm";
import authStore from "../../../store/AuthStore";
import ServiceCards from "../ServiceCards/ServiceCards";
import { toast } from "react-toastify";
const Services = () => {
    const [searchValue, setSearchValue] = useState("");
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [serviceError, setServiceError] = useState("");
    const debouncedSearchValue = useDebounceSearch(searchValue, 300);
    const { user } = authStore();
    const handleSearch = (value) => {
        setSearchValue(value);
    };
    const handleDeleteService = async (id) => {
        setLoading(true);
        try {
            await deleteService(id);
            setServices((prevServices) => prevServices.filter((service) => service._id !== id));
            setServiceError("");
        }
        catch (error) {
            toast.error("Problem While Deleting Service");
        }
        finally {
            setLoading(false);
        }
    };
    const handleCreateService = async (serviceData) => {
        setLoading(true);
        try {
            setStep(0);
            const result = await createService(serviceData);
            setServices((prevServices) => [result, ...prevServices]);
        }
        catch (error) {
            setServiceError(error?.response?.data?.message || "Error with creating service");
            toast.error("Problem While Deleting Service");
        }
        finally {
            setLoading(false);
        }
    };
    const fetchServices = async () => {
        setLoading(true);
        try {
            const result = await getAllServices();
            setServices(result);
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (services.length === 0)
            fetchServices();
    }, []);
    const filteredData = useMemo(() => {
        const search = debouncedSearchValue.toLowerCase();
        return services.filter((service) => service.name?.toLowerCase().includes(search) ||
            service.description?.toLowerCase().includes(search));
    }, [debouncedSearchValue, services]);
    useEffect(() => {
        if (debouncedSearchValue.trim() !== "") {
            setSearchLoading(true);
            const timer = setTimeout(() => {
                setSearchLoading(false);
            }, 300);
            return () => clearTimeout(timer);
        }
        else {
            setSearchLoading(false);
        }
    }, [debouncedSearchValue]);
    return (_jsx(_Fragment, { children: _jsxs("main", { className: `${styles.wrapper} w-100`, children: [step === 0 && (_jsxs(_Fragment, { children: [_jsxs("div", { className: `${styles.header} d-f align-center justify-between`, children: [_jsx(TextInput, { placeholder: "Search", type: "text", value: searchValue, name: "search_projects", required: false, hasIcon: true, onChange: handleSearch }), user?.role === "admin" && (_jsx(LibButton, { label: "+ Add New", onSubmit: () => setStep(1), backgroundColor: "transparent", color: "#6550b4", bold: true, hoverColor: "#563db11c" }))] }), _jsx("div", { className: styles.content, children: loading || (searchLoading && searchValue.trim() !== "") ? (_jsx(ServiceCardSkeleton, {})) : (_jsx(ServiceCards, { data: filteredData, onDelete: handleDeleteService })) })] })), step === 1 && (_jsx(ServiceForm, { onBack: () => setStep(0), emitCreateService: handleCreateService, error: serviceError }))] }) }));
};
export default Services;
