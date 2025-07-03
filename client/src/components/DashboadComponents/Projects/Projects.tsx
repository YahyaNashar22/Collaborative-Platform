import { useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Projects.module.css";
import Cards from "../Cards/Cards";
import useDebounceSearch from "../../../hooks/useDebounceSearch";

const Projects = () => {
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
  const debouncedSearchValue = useDebounceSearch(searchValue, 300);

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
  return (
    <main className={`${styles.wrapper} w-100`}>
      <div className={styles.header}>
        <TextInput
          placeholder="Search"
          type="text"
          value={searchValue}
          name="search_projects"
          required={false}
          hasIcon={true}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.content}>
        <Cards data={filteredData} onCardClick={handleCardClick} />
      </div>
    </main>
  );
};

export default Projects;
