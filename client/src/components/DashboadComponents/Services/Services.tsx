import { useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Services.module.css";
import Cards from "../Cards/Cards";
import useDebounceSearch from "../../../hooks/useDebounceSearch";
import LibButton from "../../../libs/common/lib-button/LibButton";
import TextAreaInput from "../../../libs/common/lib-textArea/TextAreaInput";

const Services = () => {
  const mockData = [
    {
      id: "1",
      title: "Design a Landing Page",
      description: "Need a clean and modern landing page for a SaaS product.",
      deadline: "July 20, 2025",
      offerDeadline: "July 15, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "2",
      title: "Develop Mobile App",
      description: "Build a cross-platform mobile app with React Native.",
      deadline: "August 10, 2025",
      offerDeadline: "August 1, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "3",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
  ];

  const [searchValue, setSearchValue] = useState("");

  const [step, setStep] = useState(0);
  const debouncedSearchValue = useDebounceSearch(searchValue, 300);
  const [requestForm, setRequestForm] = useState({
    title: "",
    description: "",
  });

  const filteredData = mockData.filter(
    (data) =>
      data.title.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
      data.description
        .toLowerCase()
        .includes(debouncedSearchValue.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleCardClick = (id: string) => {
    console.log("Card clicked with id:", id);
  };

  const handleAddService = () => {};

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
              <LibButton
                label="+ Add New"
                onSubmit={() => setStep(1)}
                backgroundColor="transparent"
                color="#6550b4"
                bold={true}
                hoverColor="#563db11c"
              />
            </div>
            <div className={styles.content}>
              <Cards data={filteredData} onCardClick={handleCardClick} />
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <div className={styles.header}>
              <h1>Create New Service</h1>
            </div>
            <form>
              <TextInput
                name="title"
                label="Title"
                type="string"
                placeholder="Enter title"
                required={false}
                value={requestForm["title"]}
                onChange={(value: string) =>
                  setRequestForm((prev) => ({
                    ...prev,
                    estimatedDeadline: value,
                  }))
                }
              />

              <TextAreaInput
                name="description"
                label="Description"
                placeholder="Enter description"
                required={false}
                value={requestForm["description"]}
                onChange={(value: string) =>
                  setRequestForm((prev) => ({
                    ...prev,
                    description: value,
                  }))
                }
              />
            </form>
            <div className={`${styles.buttons} d-f align-center justify-end`}>
              <LibButton
                label="Back"
                onSubmit={() => setStep(0)}
                backgroundColor="#57417e"
                hoverColor="#49356a"
                padding="0 20px"
              />
              <LibButton
                label="Submit"
                onSubmit={handleAddService}
                backgroundColor="#825beb"
                hoverColor="#6c46d9"
                padding="0 20px"
              />
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Services;
