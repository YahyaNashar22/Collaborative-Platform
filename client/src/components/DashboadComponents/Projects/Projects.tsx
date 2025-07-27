import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Projects.module.css";
import Cards from "../Cards/Cards";
import useDebounceSearch from "../../../hooks/useDebounceSearch";
import ProjectConfiguration from "./ProjectConfiguration/ProjectConfiguration";
import { useEffect, useMemo, useState } from "react";
import { getAllProjects } from "../../../services/ProjectServices";
import ServiceCardSkeletonGrid from "../../../shared/CardSkeletonLoading/CardSkeletonLoading";

const Projects = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounceSearch(searchValue, 300);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [openPoject, setOpenProject] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleCardClick = (id: string) => {
    setOpenProject(id);
  };

  const toggleView = (id: string) => {
    console.log(id);
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const result = await getAllProjects();
      if (result) {
        setProjects(result);
        setFilteredProjects(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects when search changes
  useEffect(() => {
    if (!debouncedSearchValue) {
      setFilteredProjects(projects);
      return;
    }

    setIsFiltering(true);

    const search = debouncedSearchValue.toLowerCase();
    const filtered = projects.filter(
      (project) =>
        project.title?.toLowerCase().includes(search) ||
        project.description?.toLowerCase().includes(search)
    );

    setFilteredProjects(filtered);
    setIsFiltering(false);
  }, [debouncedSearchValue, projects]);

  return (
    <>
      {openPoject ? (
        <div className="w-100">
          <ProjectConfiguration onClickNode={toggleView} />
        </div>
      ) : (
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

          {isLoading || isFiltering ? (
            <ServiceCardSkeletonGrid />
          ) : (
            <div className={styles.content}>
              <Cards data={filteredProjects} onCardClick={handleCardClick} />
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default Projects;
