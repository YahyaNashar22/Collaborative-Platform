import React, { useEffect, useState } from "react";

import styles from "./CompanyData.module.css";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import LibButton from "../../../libs/common/lib-button/LibButton";

import { registerFormData } from "../../../data/registerFormData";
import { FormField } from "../../../interfaces/registerSignup";
import TextAreaInput from "../../../libs/common/lib-textArea/TextAreaInput";
import SelectInput from "../../../libs/common/lib-select-input/SelectInput";
import { Service } from "../../../interfaces/service";
import { getAllServices } from "../../../services/ServiceServices";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import { CompanyDataTabProps } from "../../../interfaces/Profile";
import { Validate } from "../../../utils/Validate";

const fields: FormField[] =
  registerFormData.roles.provider.types.default.formData[1].form;

const CompanyDataTab: React.FC<CompanyDataTabProps> = ({
  userData,
  onCancel,
  onSave,
  isViewer = false,
}) => {
  const [services, setServices] = useState<Service[]>([]);
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

      const unselectedOptions = transformedServices.filter(
        (opt) => !selected.find((sel) => sel.id === opt.id)
      );

      setServices(unselectedOptions);
      setSelectedServices(selected);
      toast.error(error?.response?.data?.message || "Error fetching services");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    name: string,
    value: string | string[],
    required: boolean,
    type: string
  ) => {
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
      if (error) newErrors[name] = error;
      else delete newErrors[name];
      return newErrors;
    });
  };

  const handleSave = () => {
    console.log("errors: ", errors);
    console.log(updatedData);
    if (Object.keys(errors).length === 0) onSave(updatedData);
  };

  useEffect(() => {
    if (services.length === 0) fetchServices();
  }, []);

  console.log(userData.services);
  return (
    <div className={styles.companyDataTab}>
      <form className={`${styles.form} d-f f-dir-col `}>
        {fields.slice(0, 5).map((field: FormField, index: number) => {
          return (
            <div key={index}>
              {field.type === "aria" ? (
                <TextAreaInput
                  label={field.label}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={updatedData[field.name] ?? userData[field.name] ?? ""}
                  required={field.required || false}
                  onChange={(value, name) =>
                    handleChange(
                      name,
                      value,
                      field.required || false,
                      field.type
                    )
                  }
                  disabled={isViewer}
                />
              ) : (
                <TextInput
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={updatedData[field.name] ?? userData[field.name] ?? ""}
                  required={field.required || false}
                  maxLength={Number(field.maxLength)}
                  minLength={Number(field.minLength)}
                  min={Number(field.minLength)}
                  onChange={(value, name) =>
                    handleChange(
                      name,
                      value,
                      field.required || false,
                      field.type
                    )
                  }
                  errorMessage={errors[field.name]}
                  disabled={isViewer}
                />
              )}
            </div>
          );
        })}
        <div className={`${styles.firstRow} d-f w-100`} style={{ gap: "20px" }}>
          {fields.slice(5, 7).map((field: FormField, index: number) => (
            <div key={index} style={{ flex: 1 }}>
              <SelectInput
                label={field.label}
                name={field.name}
                type={field.type}
                value={updatedData[field.name] ?? userData[field.name] ?? ""}
                required={field.required}
                placeholder={field.placeholder}
                options={field.options || []}
                onChange={(value) =>
                  handleChange(
                    field.name,
                    value,
                    field.required || false,
                    field.type
                  )
                }
                errorMessage={errors[field.name]}
                disabled={isViewer}
              />
            </div>
          ))}
        </div>
        {fields.slice(7).map((field: FormField, index: number) => (
          <div key={index} style={{ flex: 1 }}>
            <label className="bold">
              Pick a Service <span className="error">*</span>
            </label>
            <Multiselect
              options={services}
              selectedValues={[]}
              onSelect={(items) => {
                setSelectedServices(items);

                const newServiceIds = items.map((item) => item.id);

                handleChange("services", newServiceIds, true, "multiselect");
              }}
              onRemove={(items) => {
                setSelectedServices(items);
                handleChange(
                  "services",
                  items.map((item) => item.id),
                  true,
                  "multiselect"
                );
              }}
              disable={loading || isViewer}
              displayValue="label"
              placeholder="Select services"
              className={`multiSelect pointer ${
                errors["services"] && "specialError"
              }`}
            />

            <div className={styles.tags}>
              {/* 🔒 Locked assigned tags (non-removable) */}
              {userData?.services.map((item) => (
                <div className={styles.tag} key={item.value}>
                  {item.name}
                  <span className={styles.locked}>🔒</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </form>
      {!isViewer && (
        <div className={`${styles.buttons} d-f align-center justify-between`}>
          <LibButton
            label="Cancel"
            onSubmit={onCancel}
            outlined
            color="var(--deep-purple)"
            hoverColor="#8563c326"
            padding="0"
          />
          <LibButton label="Save" onSubmit={handleSave} padding="0" />
        </div>
      )}
    </div>
  );
};

export default CompanyDataTab;
