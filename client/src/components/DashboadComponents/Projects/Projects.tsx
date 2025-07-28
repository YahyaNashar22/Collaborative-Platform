import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Projects.module.css";
import ProjectConfiguration from "./ProjectConfiguration/ProjectConfiguration";
import { useEffect, useRef, useState } from "react";
import { getAllProjects } from "../../../services/ProjectServices";
import ServiceCardSkeletonGrid from "../../../shared/CardSkeletonLoading/CardSkeletonLoading";
import ProjectCards from "../ProjectCards/ProjectCards";
import authStore from "../../../store/AuthStore";

const Projects = () => {
  const [searchValue, setSearchValue] = useState("");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [openPoject, setOpenProject] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const debounceRef = useRef(null);
  const { user } = authStore();
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const onStartProjectConfiguration = (index: number) => {
    console.log(index);
    setOpenProject(index);
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

  const handleUpdateStage = async (
    stageId: string,
    projectId: string,
    updateData: { [key: string]: string | Date }
  ) => {
    try {
      const result = await updateStage(projectId, stageId, updateData);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {openPoject !== null ? (
        <div className={`w-100 ${styles.projectContainer}`}>
          <ProjectConfiguration
            onClickNode={toggleView}
            projectData={projects[openPoject]}
            updateStage={handleUpdateStage}
            userData={user}
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
