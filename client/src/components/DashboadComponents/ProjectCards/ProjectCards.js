import { jsx as _jsx } from "react/jsx-runtime";
import LibButton from "../../../libs/common/lib-button/LibButton";
import Card from "../Card/Card";
import styles from "./ProjectCards.module.css";
const ProjectCards = ({ data, onCardClick }) => {
    return (_jsx("div", { className: styles.cardsContainer, children: data.length === 0 ? (_jsx("div", { className: styles.emptyState })) : (data.map(({ _id: id, title, description, projectDeadline, 
        //   stages,
        status, projectEstimatedDeadline, }, index) => {
            return (_jsx(Card, { name: title, description: description, projectDeadline: projectDeadline, projectStatus: status, 
                // stage={stages[index]}
                projectEstimatedDeadline: projectEstimatedDeadline, children: _jsx("div", { className: "d-f justify-end", children: _jsx(LibButton, { label: "Configure", onSubmit: () => onCardClick(index), bold: true }) }) }, id));
        })) }));
};
export default ProjectCards;
