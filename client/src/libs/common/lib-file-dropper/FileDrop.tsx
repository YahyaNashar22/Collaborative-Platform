import { useRef, useState } from "react";
import styles from "./FileDrop.module.css";
import LibButton from "../lib-button/LibButton";

type FileDropProps = {
  phaseId: number;
  onFileChange?: (file: File) => void;
  onUpload?: (file: File | null) => void;
  onRequest?: (phaseId: number) => void;
};

const FileDrop = ({
  phaseId,
  onFileChange,
  onUpload,
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

  return (
    <div className={styles.card}>
      <h4>Phase {phaseId}</h4>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      <div className={styles.dropBox} onClick={handleClick}>
        <span>+</span>
        <p>Drop your file here or click to upload</p>
        {selectedFile && (
          <div className={styles.fileName}>Selected: {selectedFile.name}</div>
        )}
      </div>

      <div className={`${styles.actions} d-f align-end justify-end`}>
        <LibButton
          label="Upload"
          onSubmit={() => onUpload?.(selectedFile)}
          backgroundColor="#825beb"
          hoverColor="#6c46d9"
          padding="0 1.5rem"
        />
        <LibButton
          label="Request File"
          onSubmit={() => onRequest?.(phaseId)}
          backgroundColor="#57417e"
          hoverColor="#49356a"
          padding="0 1.5rem"
        />
      </div>
    </div>
  );
};

export default FileDrop;
