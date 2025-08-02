import { useRef, useState } from "react";
import styles from "./FileDrop.module.css";
import LibButton from "../lib-button/LibButton";
import { downloadFile } from "../../../services/FileUpload";

type FileDropProps = {
  phase: { [key: string]: string | File | string[] };
  assignedStages: boolean;
  // isUploadedFiles: boolean;
  userRole: string;
  viewer: boolean;

  onUpload?: (file: File | null, phaseId: string) => void;
  onRequest?: () => void;
};

const FileDrop = ({
  phase,

  userRole,
  assignedStages,
  onUpload,
  // isUploadedFiles,
  onRequest,
}: FileDropProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.card}>
      <h4>Phase {phase?.name as string}</h4>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      <div
        className={`${styles.dropBox} ${
          !assignedStages ||
          userRole === "admin" ||
          phase.status !== "in_progress"
            ? styles.disabled
            : ""
        }`}
        onClick={handleClick}
      >
        <span>+</span>
        <p>Drop your file here or click to upload</p>
        {selectedFile && (
          <div className={styles.fileName}>Selected: {selectedFile.name}</div>
        )}
      </div>

      {userRole !== "admin" &&
        Array.isArray(phase.projectFiles) &&
        phase.projectFiles?.length > 0 && (
          <div className={styles.uploadedSection}>
            <h5 className={styles.uploadedTitle}>Uploaded Files</h5>
            <ul className={styles.uploadedList}>
              {phase.projectFiles.map((file, i) => (
                <li key={i} className={styles.uploadedItem}>
                  <div className={styles.fileDetails}>
                    <span className={styles.fileName}>{file}</span>
                  </div>
                  <div
                    className={`${styles.downloadLink} pointer`}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadFile(file);
                    }}
                  >
                    ⬇ Download
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

      <div className={`${styles.actions} d-f align-end justify-end`}>
        {userRole !== "admin" && (
          <>
            <LibButton
              label="Upload"
              onSubmit={() => onUpload?.(selectedFile, phase._id as string)}
              backgroundColor="#825beb"
              disabled={!assignedStages || phase.status !== "in_progress"}
              hoverColor="#6c46d9"
              padding="0 1.5rem"
            />
            <LibButton
              label="Request File"
              onSubmit={onRequest}
              backgroundColor="#57417e"
              disabled={!assignedStages || phase.status !== "in_progress"}
              hoverColor="#49356a"
              padding="0 1.5rem"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FileDrop;
