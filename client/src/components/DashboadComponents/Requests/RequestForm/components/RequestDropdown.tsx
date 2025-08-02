import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import styles from "./RequestDropdown.module.css";
import { getAllServices } from "../../../../../services/ServiceServices";

interface SelectOption {
  value: string;
  label: string;
}

interface RequestDropdownType {
  emitSelectedService: (serviceId: string) => void;
}

const RequestDropdown = ({ emitSelectedService }: RequestDropdownType) => {
  const [serviceOptions, setServiceOptions] = useState<SelectOption[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<SelectOption | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: "100%",
    }),
    control: (base: any) => ({
      ...base,
      width: "100%",
      borderColor: "#ccc",
      boxShadow: "none",
      outline: "none",
      "&:hover": {
        borderColor: "#ccc",
      },
    }),
    placeholder: (base: any) => ({
      ...base,
      fontSize: "12px",
    }),
    option: (base: any, state: any) => ({
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
    menu: (base: any) => ({
      ...base,
      boxShadow: "none",
      border: "1px solid #ccc",
      fontSize: "12px",
    }),
    singleValue: (base: any) => ({
      ...base,
      fontSize: "12px",
      color: "#333",
    }),
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const result = await getAllServices();
      const options: SelectOption[] = result.map((service: any) => ({
        value: service._id,
        label: service.name,
      }));
      setServiceOptions(options);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (selected: SingleValue<SelectOption>) => {
    if (selected) {
      setSelectedRequest(selected);
      emitSelectedService(selected.value);
    } else {
      setSelectedRequest(null);
      emitSelectedService("");
    }
  };

  return (
    <div className={styles.container}>
      <Select
        options={serviceOptions}
        onChange={handleChange}
        isSearchable={true}
        placeholder={loading ? "Loading..." : "Select a request..."}
        value={selectedRequest}
        styles={customStyles}
        isLoading={loading}
      />
    </div>
  );
};

export default RequestDropdown;
