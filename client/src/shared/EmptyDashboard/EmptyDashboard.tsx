import styles from "./EmptyDashboard.module.css";

import person from "../../assets/icons/person.png";
import IEmptyDashboard from "../../interfaces/IEmptyDashboard";
import { FC } from "react";

const EmptyDashboard: FC<IEmptyDashboard> = ({
  text,
  buttonText,
  buttonAction,
}) => {
  return (
    <section
      className={`${styles.wrapper} d-f align-center justify-center f-dir-col`}
    >
      <img src={person} width={128} height={128} loading="lazy" />
      <h2>{text}</h2>
      <button type="button" onClick={buttonAction} className="pointer">
        {buttonText}
      </button>
    </section>
  );
};

export default EmptyDashboard;
