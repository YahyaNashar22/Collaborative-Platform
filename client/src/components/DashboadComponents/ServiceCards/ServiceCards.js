import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./ServiceCards.module.css";
const ServiceCards = ({ data, onDelete }) => {
    return (_jsx("div", { className: styles.compactCardsContainer, children: data.length === 0 ? (_jsx("div", { className: styles.emptyState, children: "No services available." })) : (data.map(({ _id, name, description }) => (_jsxs("div", { className: `${styles.compactCard} d-f justify-between`, children: [_jsxs("div", { className: styles.cardHeader, children: [_jsx("p", { className: styles.cardTitle, children: name }), _jsx("p", { className: styles.cardDesc, children: description })] }), _jsx("button", { className: `${styles.trashButton} pointer`, onClick: () => onDelete(_id), "aria-label": "Delete service", children: _jsx(FontAwesomeIcon, { className: styles.trash, icon: faTrash }) })] }, _id)))) }));
};
export default ServiceCards;
