// @ts-nocheck

import { useEffect, useMemo, useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Services.module.css";
import useDebounceSearch from "../../../hooks/useDebounceSearch";
import LibButton from "../../../libs/common/lib-button/LibButton";
import {
  createService,
  deleteService,
  getAllServices,
} from "../../../services/ServiceServices";
import ServiceCardSkeleton from "../../../shared/ServiceSkeletonLoading/ServiceSkeletonLoading";
import ServiceForm from "./components/ServiceForm";
import authStore from "../../../store/AuthStore";
import { Service } from "../../../interfaces/service";
import ServiceCards from "../ServiceCards/ServiceCards";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [serviceError, setServiceError] = useState("");
  const debouncedSearchValue = useDebounceSearch(searchValue, 300);

  const { user } = authStore();

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDeleteService = async (id: string) => {
    setLoading(true);
    try {
      await deleteService(id);
      setServices((prevServices) =>
        prevServices.filter((service) => service._id !== id),
      );
      setServiceError("");
    } catch {
      toast.error(t("Problem While Deleting Service"));
    } finally { 
      setLoading(false);
    }
  };

  const handleCreateService = async (serviceData: {
    name: string;
    description: string;
  }) => {
    setLoading(true);
    try {
      setStep(0);
      const result = await createService(serviceData);
      setServices((prevServices) => [result, ...prevServices]);
    } catch (error) {
      setServiceError(
        (error as any)?.data?.message || t("Error with creating service"),
      );
      toast.error(t("Problem While Deleting Service"));
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const result = await getAllServices();
      setServices(result);
    } catch (error) {
      toast.error((error as any)?.data?.message || t("Error Occurred!"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (services.length === 0) fetchServices();
  }, []);

  const filteredData = useMemo(() => {
    const search = debouncedSearchValue.toLowerCase();
    return services.filter(
      (service) =>
        service.name?.toLowerCase().includes(search) ||
        service.description?.toLowerCase().includes(search),
    );
  }, [debouncedSearchValue, services]);

  useEffect(() => {
    if (debouncedSearchValue.trim() !== "") {
      setSearchLoading(true);

      const timer = setTimeout(() => {
        setSearchLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchLoading(false);
    }
  }, [debouncedSearchValue]);

  return (
    <>
      <main className={`${styles.wrapper} w-100`}>
        {step === 0 && (
          <>
            <div className={styles.header}>
              {user?.role === "admin" && (
                <div className={styles.addButtonRow}>
                  <LibButton
                    label={t("+ Add New")}
                    onSubmit={() => setStep(1)}
                    backgroundColor="transparent"
                    color="#6550b4"
                    bold={true}
                    hoverColor="#563db11c"
                  />
                </div>
              )}
              <div className="d-f align-center justify-between">
              <TextInput
                placeholder={t("Search")}
                type="text"
                value={searchValue}
                name="search_projects"
                required={false}
                hasIcon={true}
                onChange={handleSearch}
              />
              </div>
            </div>
            <div className={styles.content}>
              {loading || (searchLoading && searchValue.trim() !== "") ? (
                <ServiceCardSkeleton />
              ) : (
                <ServiceCards
                  data={filteredData}
                  onDelete={handleDeleteService}
                />
              )}
            </div>
          </>
        )}
        {step === 1 && (
          <ServiceForm
            onBack={() => setStep(0)}
            emitCreateService={handleCreateService}
            error={serviceError}
          />
        )}
      </main>
    </>
  );
};

export default Services;
