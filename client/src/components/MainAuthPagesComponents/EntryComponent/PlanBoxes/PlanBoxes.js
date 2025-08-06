import { jsx as _jsx } from "react/jsx-runtime";
import PlanBox from "./PlanBox/PlanBox";
import styles from "./PlanBoxes.module.css";
import { boxesData } from "../../../../data/BoxesData";
const PlanBoxes = ({ step, selected, onSelect, query }) => (_jsx("div", { className: `${styles.avatarContainer} d-f align-center`, children: query ? (_jsx(PlanBox, { icon: boxesData[query].icon, label: boxesData[query].label, step: step, description: boxesData[query].description })) : (Object.values(boxesData).map(({ key, icon, label, description }) => (_jsx(PlanBox, { icon: icon, label: label, isSelected: selected === key, step: step, onClick: () => onSelect(key), description: description }, key)))) }));
export default PlanBoxes;
