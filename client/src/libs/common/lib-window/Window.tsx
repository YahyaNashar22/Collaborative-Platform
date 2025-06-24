import { ReactNode } from "react";
import styles from "./Window.module.css";

type WindowProps = {
  visible: boolean;
  title?: string;
  size?: "normal" | "large" | "full";
  children: ReactNode;
  onClose: () => void;
};

const Window = ({
  visible,
  title,
  size = "normal",
  children,
  onClose,
}: WindowProps) => {
  if (!visible) return null;

  return (
    <div
      className={styles.dialog}
      tabIndex={0}
      autoFocus
      role="dialog"
      aria-modal={true}
      aria-labelledby="modal-title"
    >
      <div className={styles.blackMask}></div>

      <div
        className={`${styles.window} ${size === "large" ? styles.lg : ""} ${
          size === "full" ? styles.full : ""
        }`}
      >
        <div className={`${styles.header}  ${title == null ? styles.end : ""}`}>
          {title && (
            <div className={`${styles.title} bold purple`}>{title}</div>
          )}
          <div className={`${styles.closeIcon}`} onClick={onClose}>
            ×
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Window;
