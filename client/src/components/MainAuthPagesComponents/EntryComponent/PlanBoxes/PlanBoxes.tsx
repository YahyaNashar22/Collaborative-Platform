import PlanBox from "./PlanBox/PlanBox";
import styles from "./PlanBoxes.module.css";
import { boxesData } from "../../../../data/BoxesData";
import { useTranslation } from "react-i18next";

type BoxesDataKey = keyof typeof boxesData;

interface planTypes {
  step: number;
  selected: string;
  query: BoxesDataKey | null;
  onSelect: (label: string) => void;
}
const PlanBoxes = ({ step, selected, onSelect, query }: planTypes) => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.avatarContainer} d-f align-center`}>
      {query ? (
        <PlanBox
          icon={boxesData[query].icon}
          label={boxesData[query].label}
          step={step}
          description={boxesData[query].description}
        />
      ) : (
        Object.values(boxesData).map(
          ({ key, icon, label, description, hint }) => (
            <PlanBox
              key={key}
              icon={icon}
              label={t(label)}
              isSelected={selected === key}
              step={step}
              hint={t(hint)}
              onClick={() => onSelect(key)}
              description={t(description)}
            />
          ),
        )
      )}
    </div>
  );
};

export default PlanBoxes;
