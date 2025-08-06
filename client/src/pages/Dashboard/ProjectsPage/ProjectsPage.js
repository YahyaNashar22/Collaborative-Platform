import { jsx as _jsx } from "react/jsx-runtime";
import Projects from "../../../components/DashboadComponents/Projects/Projects";
import styles from "./ProjectsPage.module.css";
const ProjectsPage = () => {
    return (_jsx("div", { className: `${styles.wrapper} d-f w-100`, children: _jsx(Projects, {}) }));
};
export default ProjectsPage;
