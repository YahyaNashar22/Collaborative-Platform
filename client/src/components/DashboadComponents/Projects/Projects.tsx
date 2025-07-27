import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Projects.module.css";
import ProjectConfiguration from "./ProjectConfiguration/ProjectConfiguration";
import { useEffect, useRef, useState } from "react";
import { getAllProjects } from "../../../services/ProjectServices";
import ServiceCardSkeletonGrid from "../../../shared/CardSkeletonLoading/CardSkeletonLoading";
import ProjectCards from "../ProjectCards/ProjectCards";

const Projects = () => {
  const [searchValue, setSearchValue] = useState("");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [openPoject, setOpenProject] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const debounceRef = useRef(null);
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const onStartProjectConfiguration = (id: string) => {
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
    if (!searchValue) {
      console.log(projects);
      setFilteredProjects(projects);
      return;
    }

    setIsFiltering(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const search = searchValue.toLowerCase();

      const filtered = projects.filter((req) =>
        req.title?.toLowerCase().includes(search)
      );

      setFilteredProjects(filtered);
      setIsFiltering(false);
    }, 300);
  }, [searchValue, projects]);

  return (
    <>
      {openPoject ? (
        <div className={`w-100 ${styles.projectContainer}`}>
          <ProjectConfiguration
            onClickNode={toggleView}
            projectsData={projects}
          />
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
          {/* <div className={`${styles.buttons} d-f align-center justify-end`}>
            <LibButton
              label="Back"
              onSubmit={console.log}
              backgroundColor="#57417e"
              hoverColor="#49356a"
              padding="0 20px"
            />
            <LibButton
              label="Submit"
              onSubmit={console.log}
              backgroundColor="#825beb"
              hoverColor="#6c46d9"
              padding="0 20px"
            />
          </div> */}
          {isLoading || isFiltering ? (
            <ServiceCardSkeletonGrid />
          ) : (
            <div className={styles.content}>
              <ProjectCards
                data={filteredProjects}
                // userData={user}
                onCardClick={onStartProjectConfiguration}
              />
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default Projects;
