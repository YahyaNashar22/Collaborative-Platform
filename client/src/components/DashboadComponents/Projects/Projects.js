import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Projects.module.css";
import ProjectConfiguration from "./ProjectConfiguration/ProjectConfiguration";
import { useEffect, useRef, useState } from "react";
import { getAllProjects } from "../../../services/ProjectServices";
import ProjectCards from "../ProjectCards/ProjectCards";
import authStore from "../../../store/AuthStore";
import CardSkeletonLoading from "../../../shared/CardSkeletonLoading/CardSkeletonLoading";
const Projects = () => {
    const [searchValue, setSearchValue] = useState("");
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [openPoject, setOpenProject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);
    const debounceRef = useRef(null);
    const { user } = authStore();
    const handleSearch = (value) => {
        setSearchValue(value);
    };
    const onStartProjectConfiguration = (index) => {
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
        }
        catch (error) {
            console.error(error);
        }
        finally {
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
        if (debounceRef.current)
            clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            const search = searchValue.toLowerCase();
            const filtered = projects.filter((req) => req.title?.toLowerCase().includes(search));
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
    return (_jsx(_Fragment, { children: openPoject !== null ? (_jsx("div", { className: `w-100 ${styles.projectContainer}`, children: _jsx(ProjectConfiguration
            // onClickNode={toggleView}
            , { 
                // onClickNode={toggleView}
                projectData: projects[openPoject], 
                // updateStage={handleUpdateStage}
                userData: user, onBack: () => setOpenProject(null) }) })) : (_jsxs("main", { className: `${styles.wrapper} w-100`, children: [_jsx("div", { className: styles.header, children: _jsx(TextInput, { placeholder: "Search", type: "text", value: searchValue, name: "search_projects", required: false, hasIcon: true, onChange: handleSearch }) }), isLoading || isFiltering ? (_jsx(CardSkeletonLoading, {})) : (_jsx(_Fragment, { children: filteredProjects.length > 0 ? (_jsx("div", { className: styles.content, children: _jsx(ProjectCards, { data: filteredProjects, onCardClick: onStartProjectConfiguration }) })) : (_jsx("div", { className: "empty-data", children: "No Data!" })) }))] })) }));
};
export default Projects;
