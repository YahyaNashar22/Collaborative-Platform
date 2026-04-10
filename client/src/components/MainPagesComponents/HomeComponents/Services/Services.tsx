import { useEffect, useState } from "react";
import styles from "./Services.module.css";
import BoxCard from "../../../../shared/BoxCard/BoxCard";
import { useTranslation } from "react-i18next";
import { getAllServices } from "../../../../services/ServiceServices";

interface ServiceCardData {
  _id: string;
  name: string;
  description?: string;
  hasActiveProviders?: boolean;
  providerCount?: number;
}

const Services = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState<ServiceCardData[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await getAllServices();
        setServices(result.slice(0, 3));
      } catch {
        setServices([]);
      }
    };

    fetchServices();
  }, []);

  return (
    <section
      className={`${styles.wrapper} d-f w-100 justify-center align-center f-dir-col`}
      id="market_place"
    >
      <h3 className="title">{t("SERVICES BY PROVIDERS")}</h3>
      <p className={`${styles.subTitle}`}>{t("Services By Providers text")}</p>

      <div className={`align-text ${styles.boxsContainer} d-f align-center`}>
        {services.map((service) => (
          <BoxCard
            key={service._id}
            text={service.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 3)}
            alt={service.name}
            title={service.name}
            description={service.description || t("No description provided")}
            status={service.hasActiveProviders ? "active" : "pending"}
            meta={
              service.providerCount
                ? `${service.providerCount} ${t("Providers")}`
                : t("No active providers")
            }
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
