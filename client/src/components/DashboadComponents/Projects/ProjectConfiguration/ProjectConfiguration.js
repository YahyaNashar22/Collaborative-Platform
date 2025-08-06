import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from "react";
import styles from "./ProjectConfiguration.module.css";
import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import TextAreaInput from "../../../../libs/common/lib-textArea/TextAreaInput";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import FileDrop from "../../../../libs/common/lib-file-dropper/FileDrop";
import dayjs from "dayjs";
import Window from "../../../../libs/common/lib-window/Window";
import PhasesSkeletonLoading from "../../../../shared/PhasesSkeletonLoading/PhasesSkeletonLoading";
import { toast } from "react-toastify";
import { createStage, requestFiles, requestMeeting, setStageComplete, updateStages, uploadFile, } from "../../../../services/ProjectServices";
const ProjectConfiguration = ({ 
// onClickNode,
projectData, onBack, 
// updateStage,
userData, }) => {
    const contentRef = useRef(null);
    const nodes = [
        { id: "timeline", title: "Project Timeline" },
        { id: "files", title: "Project Files" },
        { id: "quotation", title: "Project Quotation" },
    ];
    const [selected, setSelected] = useState("timeline");
    const [selectedStage, setSelectedStage] = useState();
    const [deleteWindow, setDeleteWindow] = useState(false);
    const [saveWindow, setSaveWindow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [requestFileWindow, setRequestFileWindow] = useState(false);
    const [requestMeetingWindow, setRequestMeetingWindow] = useState(false);
    const [requestMeetingData, setRequestMeetingData] = useState("");
    const [requestFileData, setRequestFileData] = useState({ title: "", description: "" });
    const [phases, setPhases] = useState(projectData.stages.map((stage) => ({
        _id: stage._id,
        name: stage.name || "",
        description: stage.description || "",
        start: stage.start?.split("T")[0] || "",
        end: stage.end?.split("T")[0] || "",
        status: stage.status,
        projectFiles: stage.projectFiles,
        isUploadedFiles: stage.isUploadedFiles,
    })));
    const handleSelect = (id) => {
        setSelected(id);
        // onClickNode(id);
    };
    const handleCreatePhase = async () => {
        setIsLoading(true);
        const payload = {
            name: `stage ${phases.length + 1}`,
            description: "",
            isUploadedFiles: false,
            projectFiles: "",
            start: new Date(),
            end: new Date(Date.now() + 24 * 60 * 60 * 1000),
            status: "not_started",
        };
        try {
            const result = await createStage(projectData._id, payload);
            if (result)
                setPhases((prev) => [...prev, result]);
            setTimeout(() => {
                if (contentRef.current) {
                    contentRef.current.scrollTop = contentRef.current.scrollHeight;
                }
            }, 0);
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error with Creation!");
        }
        finally {
            setIsLoading(false);
        }
    };
    // const getPhaseColor = (to: string): string => {
    //   if (!to) return "#fff";
    //   const now = dayjs();
    //   const deadline = dayjs(to);
    //   const diff = deadline.diff(now, "day");
    //   if (diff < 0) return "#ffe6e6";
    //   if (diff <= 3) return "#fff3cd";
    //   if (diff <= 7) return "#e0f7fa";
    //   return "#f4f4f4";
    // };
    const handleChange = (value, name, index) => {
        setPhases((prev) => prev.map((phase, i) => i === index ? { ...phase, [name]: value } : phase));
        // to prevant calling this service if provider confirm the stage when assign stages
        if (projectData.assignedStage === true) {
            handleCompleteStage(index);
        }
    };
    const handleCompleteStage = async (index) => {
        setIsLoading(true);
        try {
            const result = await setStageComplete(projectData._id, phases[index]._id);
            // add it manually on the front end
            setPhases(result);
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleSavePhases = async () => {
        setIsLoading(true);
        try {
            const result = await updateStages(projectData._id, phases);
            // update manualy
            setPhases(result);
            projectData.assignedStage = true;
            setSaveWindow(false);
        }
        catch (error) {
            toast.error("Error With update!");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleDeleteStage = () => {
        setIsLoading(true);
        setPhases((prev) => prev.filter((_, index) => index !== selectedStage));
        setDeleteWindow(false);
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    };
    const viewer = userData?.role !== "provider" || projectData.assignedStage === true;
    const handleUploadFile = async (file, stageId) => {
        if (!file)
            return;
        try {
            const result = await uploadFile(projectData._id, stageId, file);
            const { projectFiles } = result;
            setPhases((prevPhases) => prevPhases.map((phase) => phase._id === stageId
                ? {
                    ...phase,
                    isUploadedFiles: true,
                    projectFiles,
                }
                : phase));
            toast.success("File uploaded successfully.");
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
    };
    const handleRequestFile = async () => {
        if (!requestFileData.title.trim()) {
            toast.error("Title is required to send a file request.");
            return;
        }
        try {
            const result = await requestFiles(projectData._id, requestFileData);
            toast.success("File request sent successfully.");
            setRequestFileWindow(false);
            setRequestFileData({ title: "", description: "" });
        }
        catch (error) {
            toast.error("Failed to send file request.");
        }
    };
    const handleRequestMeeting = async () => {
        if (!requestMeetingData.trim()) {
            toast.error("Meeting url is required to send a meeting request.");
            return;
        }
        try {
            await requestMeeting(projectData._id, requestMeetingData);
            toast.success("Meeting request sent successfully.");
            setRequestMeetingWindow(false);
            setRequestMeetingData("");
        }
        catch (error) {
            toast.error("Failed to send Meeting request.");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.wrapper, children: [_jsxs("div", { className: `${styles.backWrapper} d-f align-center pointer`, onClick: onBack, children: [_jsx("span", { className: styles.backArrow, children: "\u2190" }), _jsx("span", { className: styles.backText, children: "Back" })] }), _jsx("header", { className: `${styles.subNavbar} d-f `, children: nodes.map(({ id, title }, index) => (_jsxs(_Fragment, { children: [_jsxs("div", { className: `${styles.node} ${selected === id ? styles.selected : ""} d-f f-dir-col align-center justify-center pointer`, onClick: () => handleSelect(id), children: [_jsx("div", { className: `${styles.step}  d-f align-center justify-center`, children: index + 1 }), _jsx("div", { className: styles.title, children: title })] }, index), index + 1 !== nodes.length && (_jsx("div", { className: styles.line }))] }))) }), _jsxs("main", { className: styles.content, children: [selected === "timeline" && (_jsxs("div", { className: `${styles.timelineContainer} d-f f-dir-col`, children: [!viewer && (_jsx("div", { className: styles.addBtn, children: _jsx(LibButton, { label: "+ Add Phase", onSubmit: handleCreatePhase, backgroundColor: "transparent", color: "#6550b4", bold: true, hoverColor: "#563db11c" }) })), _jsx("div", { className: `${styles.phasesWrapper} d-f f-dir-col gap-1`, ref: contentRef, children: isLoading ? (_jsx(PhasesSkeletonLoading, {})) : (phases.map((phase, i) => (_jsxs("div", { className: styles.phaseCard, children: [_jsxs("div", { className: "d-f align-center justify-between", children: [_jsx("h4", { children: phase.name }), _jsx("div", { className: `${styles.statusBadge} ${styles[phase.status]}`, children: phase.status
                                                                .replace("_", " ")
                                                                .replace(/\b\w/g, (c) => c.toUpperCase()) })] }), _jsx(TextInput, { name: "name", label: "Phase Name", type: "string", placeholder: "Phase Name", required: false, value: phase.name, disabled: viewer, onChange: (value) => handleChange(value, "name", i) }), _jsx(TextAreaInput, { name: "description", label: "Description", placeholder: "Enter description", disabled: viewer, required: false, value: phase.description, onChange: (value) => handleChange(value, "description", i) }), _jsxs("div", { className: "d-f gap-1", children: [_jsx(TextInput, { name: "start", label: "Start Date", placeholder: "Pick a date", type: "date", disabled: viewer, value: new Date(phase.start).toISOString().split("T")[0], required: false, onChange: (value) => handleChange(value, "start", i) }), _jsx(TextInput, { name: "end", label: "End Date", placeholder: "Pick a date", type: "date", disabled: viewer, value: new Date(phase.end).toISOString().split("T")[0], required: false, onChange: (value) => handleChange(value, "end", i) })] }), phase.start &&
                                                    phase.end &&
                                                    dayjs(phase.start).isAfter(dayjs(phase.end)) && (_jsx("small", { className: "error", children: "* Start date must be before end date" })), _jsxs("div", { className: "d-f align-center justify-between", children: [userData?.role === "provider" && (_jsxs("label", { className: `d-f align-center ${phase.status !== "in_progress" ? "" : "pointer"}
                             `, children: [_jsx("input", { name: "status", className: "pointer", type: "checkbox", checked: phase.status === "completed", disabled: phase.status !== "in_progress", onChange: (e) => handleChange(e.target.checked
                                                                        ? "completed"
                                                                        : "in_progress", "status", i) }), "Completed"] })), !viewer && (_jsx(LibButton, { label: "Delete", disabled: viewer, onSubmit: () => {
                                                                setSelectedStage(i);
                                                                setDeleteWindow(true);
                                                            }, bold: true, padding: "0", backgroundColor: "#e53935", hoverColor: "#c62828" }))] })] }, phase._id)))) }), _jsxs("div", { className: `${styles.buttons} d-f align-center justify-end`, children: [!viewer && (_jsx(LibButton, { label: "Save", disabled: viewer, onSubmit: () => {
                                                    setSaveWindow(true);
                                                }, backgroundColor: "#825beb", hoverColor: "#6c46d9", padding: "0" })), userData?.role !== "admin" && (_jsx(LibButton, { label: "Request Meeting", onSubmit: () => setRequestMeetingWindow(true), backgroundColor: "#57417e", hoverColor: "#49356a", padding: "0 20px" }))] })] })), selected === "files" && (_jsx("div", { className: `${styles.filesContainer} d-f f-dir-col`, children: phases.map((phase, index) => (_jsx(FileDrop, { phase: phase, userRole: userData?.role, assignedStages: projectData.assignedStage, 
                                    // isUploadedFiles={phase.isUploadedFiles}
                                    onUpload: (file, stageId) => handleUploadFile(file, stageId), onRequest: () => setRequestFileWindow(true) }, index))) })), selected === "quotation" && (_jsx("div", { className: styles.quotationContainer, children: _jsxs("div", { className: styles.dataGroup, children: [_jsxs("div", { className: styles.dataItem, children: [_jsx("span", { className: styles.dataLabel, children: "Project Title" }), _jsx("div", { className: styles.dataValue, children: projectData?.title })] }), _jsxs("div", { className: styles.dataItem, children: [_jsx("span", { className: styles.dataLabel, children: "Project Description" }), _jsx("div", { className: styles.dataValue, children: projectData.description || "No Description" })] }), _jsxs("div", { className: styles.dataItem, children: [_jsx("span", { className: styles.dataLabel, children: "Project Deadline" }), _jsx("div", { className: styles.dataValue, children: new Date(projectData?.projectDeadline)
                                                        .toISOString()
                                                        .split("T")[0] })] }), _jsxs("div", { className: styles.dataItem, children: [_jsx("span", { className: styles.dataLabel, children: "Estimated Deadline" }), _jsx("div", { className: styles.dataValue, children: new Date(projectData?.projectEstimatedDeadline)
                                                        .toISOString()
                                                        .split("T")[0] })] }), _jsxs("div", { className: styles.dataItem, children: [_jsx("span", { className: styles.dataLabel, children: "Project Cost" }), _jsxs("div", { className: styles.dataValue, children: [projectData?.amount, " $"] })] })] }) }))] }), deleteWindow && (_jsxs(Window, { title: "Delete Stage", visible: deleteWindow, onClose: () => setDeleteWindow(false), isErrorWindow: "true", children: [_jsx("small", { className: "mb-1 d-b", children: "are you sure do you want to delete this stage ?" }), _jsxs("div", { className: `${styles.btns} d-f align-center justify-between`, children: [_jsx(LibButton, { label: "Cancel", onSubmit: () => setDeleteWindow(false), bold: true, padding: "0", outlined: true, color: "var(--deep-purple)", hoverColor: "#8563c326" }), _jsx(LibButton, { label: "Confirm", onSubmit: handleDeleteStage, bold: true, padding: "0", backgroundColor: "#e53935", hoverColor: "#c62828" })] })] })), saveWindow && (_jsxs(Window, { title: "Save Stage", visible: saveWindow, onClose: () => setSaveWindow(false), isErrorWindow: "true", children: [_jsx("small", { className: "mb-1 d-b", children: "are you sure do you want to Save these stages ?" }), _jsxs("div", { className: `${styles.btns} d-f align-center justify-between`, children: [_jsx(LibButton, { label: "Cancel", onSubmit: () => setSaveWindow(false), bold: true, padding: "0", outlined: true, color: "var(--deep-purple)", hoverColor: "#8563c326" }), _jsx(LibButton, { label: "Confirm", onSubmit: handleSavePhases, bold: true, padding: "0" })] })] }))] }), requestFileWindow && (_jsx(Window, { title: "Request Files", visible: requestFileWindow, onClose: () => setRequestFileWindow(false), children: _jsxs("div", { className: "d-f f-dir-col gap-1", children: [_jsx(TextInput, { name: "title", label: "Title", type: "text", placeholder: "Enter a title for the file request", value: requestFileData.title, required: true, onChange: (value) => setRequestFileData((prev) => ({ ...prev, title: value })) }), _jsx(TextInput, { name: "description", label: "Description", type: "text", placeholder: "Enter description", value: requestFileData.description, required: true, onChange: (value) => setRequestFileData((prev) => ({ ...prev, description: value })) }), _jsxs("div", { className: "d-f align-center justify-between mt-1", children: [_jsx(LibButton, { label: "Cancel", onSubmit: () => setRequestFileWindow(false), bold: true, padding: "0", outlined: true, color: "var(--deep-purple)", hoverColor: "#8563c326" }), _jsx(LibButton, { label: "Send Request", onSubmit: handleRequestFile, bold: true, backgroundColor: "#825beb", hoverColor: "#6c46d9" })] })] }) })), requestMeetingWindow && (_jsx(Window, { title: "Request Meeting", visible: requestMeetingWindow, onClose: () => setRequestMeetingWindow(false), children: _jsxs("div", { className: "d-f f-dir-col gap-1", children: [_jsx(TextInput, { name: "meeting", label: "Meeting Link", type: "url", placeholder: "Enter meeting link", value: requestMeetingData, required: true, onChange: (value) => setRequestMeetingData(value) }), _jsxs("div", { className: "d-f align-center justify-between mt-1", children: [_jsx(LibButton, { label: "Cancel", onSubmit: () => setRequestMeetingWindow(false), bold: true, padding: "0", outlined: true, color: "var(--deep-purple)", hoverColor: "#8563c326" }), _jsx(LibButton, { label: "Send Request", onSubmit: handleRequestMeeting, bold: true, backgroundColor: "#825beb", hoverColor: "#6c46d9" })] })] }) }))] }));
};
export default ProjectConfiguration;
