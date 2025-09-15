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
import { Project } from "../../../interfaces/FullRequests";

const Projects = () => {
  const [searchValue, setSearchValue] = useState("");
  const [projects, setProjects] = useState<any>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [openPoject, setOpenProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [feedbackWindow, setFeedbackWindow] = useState<number | null>(null);
  const debounceRef = useRef(null);
  const { user } = authStore();
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const onStartProjectConfiguration = (index: string) => {
    const currentProject = projects.filter((pro: any) => pro._id === index)[0];
    console.log(index, currentProject, projects);
    setOpenProject(currentProject);
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
      toast.error((error as any)?.data?.message || "Error Occured!");
    }
  };
  const handleSaveStages = () => {
    setOpenProject((prev: any) => ({ ...prev, assignedStage: true }));
  };

  return (
    <>
      {openPoject ? (
        <div className={`w-100 ${styles.projectContainer}`}>
          <ProjectConfiguration
            // onClickNode={toggleView}
            projectData={openPoject}
            // updateStage={handleUpdateStage}
            userData={user}
            emitStagesSave={handleSaveStages}
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
                    userRole={user?.role as string}
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
