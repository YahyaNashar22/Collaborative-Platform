import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Card.module.css";
const getProjectStatus = (projectDeadline) => {
    const now = new Date();
    const deadline = new Date(projectDeadline);
    const diffInDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffInDays < 0)
        return "overdue";
    if (diffInDays <= 3)
        return "urgent";
    if (diffInDays <= 7)
        return "upcoming";
    if (diffInDays <= 14)
        return "dueSoon";
    return "onTrack";
};
const getStatusLabel = (status) => {
    switch (status) {
        case "onTrack":
            return "On Track";
        case "dueSoon":
            return "Due Soon";
        case "upcoming":
            return "Upcoming";
        case "urgent":
            return "Urgent";
        case "overdue":
            return "Overdue";
        default:
            return "";
    }
};
const Card = ({ name, description, projectDeadline, offerDeadline, children, projectStatus, requestStatus, projectEstimatedDeadline, }) => {
    const status = getProjectStatus(projectDeadline);
    const statusLabel = getStatusLabel(status);
    const isAccepted = requestStatus?.toLowerCase() === "accepted";
    const isCanceled = requestStatus?.toLowerCase() === "canceled";
    const projectAccepted = projectStatus?.toLowerCase() === "completed";
    const projectInProgress = projectStatus?.toLowerCase() === "in_progress";
    return (_jsxs("div", { className: styles.card, children: [isAccepted ? (_jsx("div", { className: `${styles.statusBadge} ${styles.accepted}`, children: "Accepted" })) : isCanceled ? (_jsx("div", { className: `${styles.statusBadge} ${styles.canceled}`, children: "Canceled" })) : projectAccepted ? (_jsx("div", { className: `${styles.statusBadge} ${styles.accepted}`, children: "Completed" })) : projectInProgress ? (_jsx("div", { className: `${styles.statusBadge} ${styles.upcoming}`, children: "InProgress" })) : (_jsx("div", { className: `${styles.statusBadge} ${styles[status]}`, children: statusLabel })), _jsx("header", { className: styles.cardHeader, children: _jsx("h3", { className: styles.title, children: name || "No Title" }) }), _jsxs("div", { className: styles.cardBody, children: [_jsx("p", { className: "styles.description", children: description || "No Description" }), _jsxs("div", { className: styles.deadlineItem, children: ["Project Deadline: ", new Date(projectDeadline).toLocaleDateString()] }), offerDeadline ? (_jsxs("div", { className: styles.deadlineItem, children: ["Offer Deadline: ", new Date(offerDeadline).toLocaleDateString()] })) : (_jsxs("div", { className: styles.deadlineItem, children: ["Estimated Deadline:", " ", new Date(projectEstimatedDeadline).toLocaleDateString()] }))] }), children && _jsx("footer", { className: styles.cardFooter, children: children })] }));
};
export default Card;
