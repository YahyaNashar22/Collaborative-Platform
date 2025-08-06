import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from "react";
import styles from "./FileDrop.module.css";
import LibButton from "../lib-button/LibButton";
import { downloadFile } from "../../../services/FileUpload";
const FileDrop = ({ phase, userRole, assignedStages, onUpload, 
// isUploadedFiles,
onRequest, }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
        }
    };
    const handleClick = () => {
        fileInputRef.current?.click();
    };
    return (_jsxs("div", { className: styles.card, children: [_jsxs("h4", { children: ["Phase ", phase?.name] }), _jsx("input", { type: "file", ref: fileInputRef, onChange: handleFileSelect, style: { display: "none" } }), _jsxs("div", { className: `${styles.dropBox} ${!assignedStages ||
                    userRole === "admin" ||
                    phase.status !== "in_progress"
                    ? styles.disabled
                    : ""}`, onClick: handleClick, children: [_jsx("span", { children: "+" }), _jsx("p", { children: "Drop your file here or click to upload" }), selectedFile && (_jsxs("div", { className: styles.fileName, children: ["Selected: ", selectedFile.name] }))] }), userRole !== "admin" &&
                Array.isArray(phase.projectFiles) &&
                phase.projectFiles?.length > 0 && (_jsxs("div", { className: styles.uploadedSection, children: [_jsx("h5", { className: styles.uploadedTitle, children: "Uploaded Files" }), _jsx("ul", { className: styles.uploadedList, children: phase.projectFiles.map((file, i) => (_jsxs("li", { className: styles.uploadedItem, children: [_jsx("div", { className: styles.fileDetails, children: _jsx("span", { className: styles.fileName, children: file }) }), _jsx("div", { className: `${styles.downloadLink} pointer`, rel: "noopener noreferrer", onClick: (e) => {
                                        e.stopPropagation();
                                        downloadFile(file);
                                    }, children: "\u2B07 Download" })] }, i))) })] })), _jsx("div", { className: `${styles.actions} d-f align-end justify-end`, children: userRole !== "admin" && (_jsxs(_Fragment, { children: [_jsx(LibButton, { label: "Upload", onSubmit: () => onUpload?.(selectedFile, phase._id), backgroundColor: "#825beb", disabled: !assignedStages || phase.status !== "in_progress", hoverColor: "#6c46d9", padding: "0 1.5rem" }), _jsx(LibButton, { label: "Request File", onSubmit: onRequest, backgroundColor: "#57417e", disabled: !assignedStages || phase.status !== "in_progress", hoverColor: "#49356a", padding: "0 1.5rem" })] })) })] }));
};
export default FileDrop;
