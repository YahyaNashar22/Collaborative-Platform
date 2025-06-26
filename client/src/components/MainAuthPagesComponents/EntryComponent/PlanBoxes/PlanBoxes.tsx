import PlanBox from "./PlanBox/PlanBox";
import styles from "./PlanBoxes.module.css";
import { boxesData } from "../../../../data/BoxesData";

type BoxesDataKey = keyof typeof boxesData;

interface planTypes {
  step: number;
  selected: string;
  query: BoxesDataKey | null;
  onSelect: (label: string) => void;
}

const PlanBoxes = ({ step, selected, onSelect, query }: planTypes) => (
  <div className={`${styles.avatarContainer} d-f align-center`}>
    {query ? (
      <PlanBox
        icon={boxesData[query].icon}
        label={boxesData[query].label}
        step={step}
        description={boxesData[query].description}
      />
    ) : (
      Object.values(boxesData).map(({ key, icon, label, description }) => (
        <PlanBox
          key={key}
          icon={icon}
          label={label}
          isSelected={selected === key}
          step={step}
          onClick={() => onSelect(key)}
          description={description}
        />
      ))
    )}
  </div>
);

export default PlanBoxes;
