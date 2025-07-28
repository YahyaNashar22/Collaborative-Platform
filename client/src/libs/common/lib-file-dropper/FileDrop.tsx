import { useRef, useState } from "react";
import styles from "./FileDrop.module.css";
import LibButton from "../lib-button/LibButton";

type FileDropProps = {
  phase: { [key: string]: string | File };
  assignedStages: boolean;
  isUploadedFiles: boolean;
  userRole: string;
  viewer: boolean;
  onFileChange?: (file: File) => void;
  onUpload?: (file: File | null, phaseId: string) => void;
  onRequest?: (phaseId: string) => void;
};

const FileDrop = ({
  phase,
  onFileChange,
  userRole,
  assignedStages,
  onUpload,
  isUploadedFiles,
  onRequest,
}: FileDropProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileChange?.(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  setTimeout(() => {
    console.log(isUploadedFiles);
  }, 3000);
  return (
    <div className={styles.card}>
      <h4>Phase {phase?.name}</h4>

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
          phase.status !== "in_progress" ||
          isUploadedFiles
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

      <div className={`${styles.actions} d-f align-end justify-end`}>
        {userRole !== "admin" && (
          <>
            <LibButton
              label="Upload"
              onSubmit={() => onUpload?.(selectedFile, phase._id as string)}
              backgroundColor="#825beb"
              disabled={
                !assignedStages ||
                phase.status !== "in_progress" ||
                isUploadedFiles
              }
              hoverColor="#6c46d9"
              padding="0 1.5rem"
            />
            <LibButton
              label="Request File"
              onSubmit={() => onRequest?.(phase._id as string)}
              backgroundColor="#57417e"
              disabled={
                !assignedStages ||
                phase.status !== "in_progress" ||
                isUploadedFiles
              }
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
