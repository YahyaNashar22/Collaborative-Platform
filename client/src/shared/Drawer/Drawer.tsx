import { ReactNode } from "react";
import styles from "./Drawer.module.css";

type DrawerProps = {
  title?: string;
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Drawer = ({ title, visible, onClose, children }: DrawerProps) => {
  if (!visible) return null;

  return (
    <div className={styles.drawerOverlay}>
      <div className={styles.drawer}>
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
