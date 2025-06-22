import styles from "./Statistic.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCode,
  faPeopleGroup,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

interface statistic {
  icon: IconDefinition;
  label: string;
  number: string;
}
const Statistic = () => {
  const statisticContent: statistic[] = [
    {
      icon: faPeopleGroup,
      number: "+1000",
      label: "Satisfied Clients",
    },
    {
      icon: faMapLocationDot,
      number: "+3500",
      label: "Website Visits",
    },
    {
      icon: faFileCode,
      number: "+1000",
      label: "Projects Done",
    },
  ];
  return (
    <section
      className={`${styles.wrapper} d-f align-center justify-center`}
      id="statistic"
    >
      {statisticContent.map((elem: statistic, index: number) => (
        <div key={index} className={`${styles.element} d-f align-end`}>
          <FontAwesomeIcon
            size="2xl"
            icon={elem.icon}
            style={{ color: "#000000" }}
            className={styles.icon}
          />
          <div className={`${styles.elementText} d-f align-start f-dir-col`}>
            <h1>{elem.number}</h1>
            <small className="bold">{elem.label}</small>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Statistic;
