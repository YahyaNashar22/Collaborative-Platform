import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import styles from "./PlanBox.module.css";

const PlanBox = ({
  icon,
  label,
  isSelected,
  step,
  onClick,
  description,
}: {
  icon: IconDefinition;
  label: string;
  isSelected?: boolean;
  step: number;
  onClick?: () => void;
  description: string;
}) => (
  <div
    className={`${styles.avatarBox} ${
      step === 0 ? `${styles.allowHover} pointer` : ""
    } ${isSelected ? styles.selected : ""} d-f f-dir-col align-center`}
    onClick={onClick}
  >
    <div className={`${styles.avatar} d-f align-center justify-center`}>
      <FontAwesomeIcon icon={icon} size="2xl" style={{ color: "#b6c3f8" }} />
    </div>
    <div className={styles.avatarTitle}>{label}</div>
    {step === 0 && (
      <small className="text-align-center">
        {" "}
        {description.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </small>
    )}
  </div>
);

export default PlanBox;
