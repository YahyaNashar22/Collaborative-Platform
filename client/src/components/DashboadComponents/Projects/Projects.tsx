import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Projects.module.css";
import ProjectConfiguration from "./ProjectConfiguration/ProjectConfiguration";
import { useEffect, useRef, useState } from "react";
import { getAllProjects } from "../../../services/ProjectServices";
import ServiceCardSkeletonGrid from "../../../shared/CardSkeletonLoading/CardSkeletonLoading";
import ProjectCards from "../ProjectCards/ProjectCards";
import authStore from "../../../store/AuthStore";
import CardSkeletonLoading from "../../../shared/CardSkeletonLoading/CardSkeletonLoading";

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
    setOpenProject(index);
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

  // const handleUpdateStage = async (
  //   stageId: string,
  //   projectId: string,
  //   updateData: { [key: string]: string | Date }
  // ) => {
  //   try {
  //     const result = await updateStage(projectId, stageId, updateData);
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      {openPoject !== null ? (
        <div className={`w-100 ${styles.projectContainer}`}>
          <ProjectConfiguration
            // onClickNode={toggleView}
            projectData={projects[openPoject]}
            // updateStage={handleUpdateStage}
            userData={user}
            onBack={() => setOpenProject(null)}
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

          {isLoading || isFiltering ? (
            <CardSkeletonLoading />
          ) : (
            <>
              {filteredProjects.length > 0 ? (
                <div className={styles.content}>
                  <ProjectCards
                    data={filteredProjects}
                    onCardClick={onStartProjectConfiguration}
                  />
                </div>
              ) : (
                <div className="empty-data">No Data!</div>
              )}
            </>
          )}
        </main>
      )}
    </>
  );
};

export default Projects;
