import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Avatar from "../../../shared/Avatar/Avatar";
import styles from "./RequestsDetailsWindow.module.css";
const RequestDetailsWindow = ({ request, isAdmin }) => {
    let client;
    if (isAdmin)
        client = request?.client[0];
    return (_jsxs("div", { className: styles.scrollable, children: [isAdmin && client && (_jsxs("section", { className: styles.section, children: [_jsx("h3", { children: "Client Information" }), _jsxs("div", { className: styles.clientInfo, children: [client.profilePicture === "default" ? (_jsx(Avatar, { currentUser: {
                                    firstName: client.firstName,
                                    lastName: client.firstName,
                                } })) : (_jsx("img", { src: `/images/profiles/${client.profilePicture}.png`, alt: `${client.firstName} ${client.lastName}`, className: styles.profilePic })), _jsxs("div", { children: [_jsxs("p", { children: [_jsx("strong", { children: "Full Name:" }), " ", client.firstName, " ", client.lastName] }), _jsxs("p", { children: [_jsx("strong", { children: "Job:" }), " ", client.job] }), _jsxs("p", { children: [_jsx("strong", { children: "Phone:" }), " ", client.phone] }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", client.email] })] })] })] })), _jsxs("section", { className: styles.section, children: [_jsx("h3", { children: "Request Info" }), _jsxs("p", { children: [_jsx("strong", { children: "Title:" }), " ", request.title] }), _jsxs("p", { children: [_jsx("strong", { children: "Description:" }), " ", request.description] }), _jsxs("p", { children: [_jsx("strong", { children: "Project Deadline:" }), " ", new Date(request.projectDeadline).toLocaleDateString()] }), _jsxs("p", { children: [_jsx("strong", { children: "Offer Deadline:" }), " ", new Date(request.offerDeadline).toLocaleDateString()] }), _jsxs("p", { children: [_jsx("strong", { children: "Budget:" }), " $", request.budget] })] }), _jsxs("section", { className: styles.section, children: [_jsx("h3", { children: "Service Details" }), _jsxs("div", { className: styles.serviceItem, children: [_jsxs("p", { children: [_jsx("strong", { children: "Name:" }), " ", request.serviceDetails[0].name] }), _jsxs("p", { children: [_jsx("strong", { children: "Description:" }), " ", request.serviceDetails[0].description] })] }, request.serviceDetails[0]._id)] })] }));
};
export default RequestDetailsWindow;
