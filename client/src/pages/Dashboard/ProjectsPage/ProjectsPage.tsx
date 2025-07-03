import Projects from "../../../components/DashboadComponents/Projects/Projects";
import styles from "./ProjectsPage.module.css";

const ProjectsPage = () => {
  return (
    <div className={`${styles.wrapper} d-f w-100`}>
      <Projects />
    </div>
  );
};

export default ProjectsPage;
