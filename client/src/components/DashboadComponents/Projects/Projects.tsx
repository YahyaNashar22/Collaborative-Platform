import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Projects.module.css";
import ProjectConfiguration from "./ProjectConfiguration/ProjectConfiguration";
import { useEffect, useRef, useState } from "react";
import { getAllProjects } from "../../../services/ProjectServices";
import ProjectCards from "../ProjectCards/ProjectCards";
import authStore from "../../../store/AuthStore";
import CardSkeletonLoading from "../../../shared/CardSkeletonLoading/CardSkeletonLoading";
import Window from "../../../libs/common/lib-window/Window";
import SatisfactionSurvey from "./SatisfactionSurvey/SatisfactionSurvey";
import { Feedback } from "../../../interfaces/Project";
import { toast } from "react-toastify";
import { submitFedback } from "../../../services/Feedback";

const Projects = () => {
  const [searchValue, setSearchValue] = useState("");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [openPoject, setOpenProject] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [feedbackWindow, setFeedbackWindow] = useState<number | null>(null);
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
      const result = await getAllProjects(user);
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
  //     (result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleAddFeedback = (index) => {
    filteredProjects[index];
    setFeedbackWindow(index);
  };

  const handleSubmitFeedback = async (feedbackData: Feedback) => {
    try {
      const result = await submitFedback(feedbackData);
      result;
      if (result) {
        setFilteredProjects((prev) =>
          prev.map((project, i) =>
            i === feedbackWindow
              ? { ...project, isFeedbackSubmit: true }
              : project
          )
        );
        setFeedbackWindow(null);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Error Occured!");
    }
  };

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
                    userRole={user.role}
                    onAddFeedback={handleAddFeedback}
                  />
                </div>
              ) : (
                <div className="empty-data">No Data!</div>
              )}
            </>
          )}
        </main>
      )}

      {feedbackWindow !== null && (
        <Window
          size="large"
          title=" "
          visible={feedbackWindow !== null}
          onClose={() => setFeedbackWindow(null)}
        >
          <SatisfactionSurvey
            projectId={filteredProjects[feedbackWindow]?._id}
            userId={filteredProjects[feedbackWindow]?.clientId}
            onSubmit={(feedbackData: Feedback) => {
              handleSubmitFeedback(feedbackData);
            }}
          />
        </Window>
      )}
    </>
  );
};

export default Projects;
