import { useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./MarketPlace.module.css";
import BoxCard from "../../../shared/BoxCard/BoxCard";
import box_1 from "../../../assets/images/box_1.png";
import Window from "../../../libs/common/lib-window/Window";
import LibButton from "../../../libs/common/lib-button/LibButton";

type ServiceProvider = {
  id: string;
  label: string;
  value: string;
  isChecked: boolean;
  status: "open" | "closed";
  duration: string;
  providerName: string;
};

const MarketPlace = () => {
  const serviceProvidersData: ServiceProvider[] = [
    {
      id: "1",
      label: "Web Design Co.",
      value: "web-design",
      isChecked: false,
      status: "open",
      duration: "3 weeks",
      providerName: "PixelCraft Agency",
    },
    {
      id: "2",
      label: "SEO Experts",
      value: "seo-experts",
      isChecked: false,
      status: "closed",
      duration: "2 weeks",
      providerName: "RankBoosters Ltd.",
    },
    {
      id: "3",
      label: "Cloud Solutions Ltd.",
      value: "cloud-solutions",
      isChecked: true,
      status: "open",
      duration: "4 weeks",
      providerName: "NimbusTech",
    },
    {
      id: "4",
      label: "Mobile App Gurus",
      value: "mobile-app",
      isChecked: true,
      status: "open",
      duration: "5 weeks",
      providerName: "Appsmiths",
    },
    {
      id: "5",
      label: "E-Commerce Pros",
      value: "ecommerce",
      isChecked: false,
      status: "closed",
      duration: "3 weeks",
      providerName: "ShopCore Inc.",
    },
    {
      id: "6",
      label: "Digital Marketing Hub",
      value: "digital-marketing",
      isChecked: true,
      status: "open",
      duration: "2 weeks",
      providerName: "BuzzReach Media",
    },
    {
      id: "7",
      label: "CyberSec Experts",
      value: "cybersecurity",
      isChecked: false,
      status: "closed",
      duration: "6 weeks",
      providerName: "ShieldNet Solutions",
    },
    {
      id: "8",
      label: "UI/UX Studios",
      value: "ui-ux",
      isChecked: true,
      status: "open",
      duration: "2 weeks",
      providerName: "DesignFlow Studio",
    },
    {
      id: "9",
      label: "Data Analytics Firm",
      value: "data-analytics",
      isChecked: true,
      status: "open",
      duration: "3 weeks",
      providerName: "InsightBridge",
    },
    {
      id: "10",
      label: "DevOps Solutions",
      value: "devops",
      isChecked: true,
      status: "closed",
      duration: "4 weeks",
      providerName: "OpsWave",
    },
    {
      id: "11",
      label: "CRM Integrators",
      value: "crm",
      isChecked: true,
      status: "open",
      duration: "2 weeks",
      providerName: "ConnectSuite",
    },
    {
      id: "12",
      label: "AI Automation Inc.",
      value: "ai-automation",
      isChecked: true,
      status: "open",
      duration: "3 weeks",
      providerName: "NeuralLabs AI",
    },
  ];

  const [searchValue, setSearchValue] = useState<string>("");
  const [serviceProviders, setServiceProviders] =
    useState<ServiceProvider[]>(serviceProvidersData);
  const [openWindow, setOpenWindow] = useState({});

  const handleSearch = (e: string) => {
    const value = e;
    setSearchValue(value);
  };

  const handleFilterChange = (index: number) => {
    setServiceProviders((prev) =>
      prev.map((service, i) =>
        i === index ? { ...service, isChecked: !service.isChecked } : service
      )
    );
  };

  const handleBoxClick = (id: string) => {
    const selectedItem = serviceProviders.find((service) => service.id === id);
    if (!selectedItem) return;
    setOpenWindow(selectedItem);
  };

  return (
    <>
      <div className={`${styles.wrapper} container d-f `}>
        <div className={`${styles.leftSidePanel} d-f f-dir-col`}>
          <h2>Category</h2>
          <div className={styles.category}>
            {serviceProviders.map((service: ServiceProvider, index: number) => (
              <div
                key={service.id}
                className={`${styles.serviceItem} d-f align-center bold pointer`}
                onClick={() => handleFilterChange(index)}
              >
                <input
                  type="checkbox"
                  name={service.label}
                  value={service.value}
                  id={service.id}
                  checked={serviceProviders[index].isChecked}
                  className="pointer"
                />
                <label className="pointer">{service.label}</label>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <TextInput
              placeholder="Search"
              type="text"
              value={searchValue}
              name="search_projects"
              required={false}
              hasIcon={true}
              onChange={(e) => handleSearch(e)}
            />
          </div>

          <div className={`${styles.servicesContainer}`}>
            {serviceProviders
              .filter(
                (service) =>
                  service.isChecked &&
                  service.label
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
              )
              .map((service) => (
                <div
                  key={service.id}
                  className={`${styles.serviceItem} pointer`}
                  onClick={() => handleBoxClick(service.id)}
                >
                  <BoxCard
                    size="small"
                    image={box_1}
                    alt={service.label}
                    title={service.label}
                    duration={service.duration}
                    providerName={service.providerName}
                    status={service.status}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <Window
        title={openWindow?.label || "Service Details"}
        visible={Object.values(openWindow).length > 0}
        onClose={() => setOpenWindow({})}
      >
        <div className={`${styles.boxDetails} d-f f-dir-col`}>
          <div>
            <h3>Published Date:</h3>
            <p>18th Jun</p>
          </div>
          <div>
            <h3>Category:</h3>
            <p>{openWindow?.label}</p>
          </div>
          <div>
            <h3>Provider Name:</h3>
            <p>{openWindow?.providerName}</p>
          </div>
          <div>
            <h3>Status:</h3>
            <p
              style={{
                color: openWindow?.status === "open" ? "green" : "gray",
              }}
            >
              {openWindow?.status}
            </p>
          </div>
          <div>
            <h3>Duration:</h3>
            <p>{openWindow?.duration}</p>
          </div>
          <div className="d-f justify-between align-center mt-3">
            <LibButton
              label="Not Interested"
              backgroundColor="var(--light-grey)"
              hoverColor="#d1d1d1"
              onSubmit={() => {}}
            />
            <LibButton label="Interested" onSubmit={() => {}} />
          </div>
        </div>
      </Window>
    </>
  );
};

export default MarketPlace;
