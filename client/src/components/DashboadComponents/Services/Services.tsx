import { useEffect, useMemo, useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Services.module.css";
import Cards from "../Cards/Cards";
import useDebounceSearch from "../../../hooks/useDebounceSearch";
import LibButton from "../../../libs/common/lib-button/LibButton";
import { getAllServices } from "../../../services/ServiceServices";
import ServiceCardSkeleton from "../../../shared/CardSkeletonLoading/CardSkeletonLoading";
import ServiceForm from "./components/ServiceForm";
import authStore from "../../../store/AuthStore";
import { Service } from "../../../interfaces/service";

const Services = () => {
  const [searchValue, setSearchValue] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const debouncedSearchValue = useDebounceSearch(searchValue, 300);

  const { user } = authStore();

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleCardClick = (id: string) => {
    console.log("Card clicked with id:", id);
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const result = await getAllServices();
      setServices(result);
    } catch (error) {
      console.error(error);
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
        service.description?.toLowerCase().includes(search)
    );
  }, [debouncedSearchValue, services]);

  return (
    <>
      <main className={`${styles.wrapper} w-100`}>
        {step === 0 && (
          <>
            <div
              className={`${styles.header} d-f align-center justify-between`}
            >
              <TextInput
                placeholder="Search"
                type="text"
                value={searchValue}
                name="search_projects"
                required={false}
                hasIcon={true}
                onChange={handleSearch}
              />
              {user?.role === "admin" && (
                <LibButton
                  label="+ Add New"
                  onSubmit={() => setStep(1)}
                  backgroundColor="transparent"
                  color="#6550b4"
                  bold={true}
                  hoverColor="#563db11c"
                />
              )}
            </div>
            <div className={styles.content}>
              <Cards data={filteredData} onCardClick={handleCardClick} />
              {loading && <ServiceCardSkeleton />}
            </div>
          </>
        )}
        {step === 1 && (
          <ServiceForm
            onBack={() => setStep(0)}
            emitCreateService={() => setStep(0)}
          />
        )}
      </main>
    </>
  );
};

export default Services;
