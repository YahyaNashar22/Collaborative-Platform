import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  nodes: number;
  currentNode: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ nodes, currentNode }) => {
  return (
    <div className={`${styles.wrapper} d-f align-center`}>
      {Array.from({ length: nodes }).map((_, index: number) => (
        <span
          className={index === currentNode ? styles.selected : ""}
          key={index}
        ></span>
      ))}
    </div>
  );
};

export default ProgressBar;
