import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { statusActions } from "../../../data/StatusMessage";
import LibButton from "../../../libs/common/lib-button/LibButton";
import Card from "../Card/Card";
import styles from "./cards.module.css";
const Cards = ({ data, userData, onShowDetails, onSubmitProposal, onShowProposals, onAssignRequest, onCancelRequestByClient, }) => {
    const getAction = (id, action) => {
        switch (action) {
            case "assignByAdmin":
                onAssignRequest(id);
                break;
            case "submitProposal":
                onSubmitProposal(id);
                break;
            case "showRequest":
                onShowDetails(id);
                break;
            case "seeOfferByAdmin":
                onShowProposals(id);
                break;
            case "seeOfferByClient":
                onShowProposals(id);
                break;
            case "cancelRequestByClient":
                onCancelRequestByClient(id);
                break;
        }
    };
    return (_jsx("div", { className: styles.cardsContainer, children: data.length === 0 ? (_jsx("div", { className: styles.emptyState })) : (data.map(({ _id: id, title, description, projectDeadline, stage, status: requestStatus, providerIds, approvedQuotations, offerDeadline, }) => {
            const status = statusActions[stage]?.[userData?.role ?? ""] || {};
            const message = status.msg;
            const buttonLabel = status.button;
            const action = status.action;
            const secondButton = status.secondButton;
            const secondAction = status.secondAction;
            return (_jsxs(Card, { name: title, description: description, projectDeadline: projectDeadline, stage: stage, requestStatus: requestStatus, offerDeadline: offerDeadline, role: userData?.role, children: [stage === 4 && requestStatus === "canceled" ? (_jsxs("p", { className: styles.statusMessage, children: ["\u274C This request has been", " ", _jsx("strong", { style: { color: "var(--error) " }, children: "canceled" })] })) : (_jsx("p", { className: styles.statusMessage, children: message })), _jsxs("div", { className: `d-f ${secondButton ? "justify-between" : "justify-end"}`, children: [secondButton && (_jsx(LibButton, { styleClass: secondAction === "cancelRequestByClient"
                                    ? "outlinedErrorBtn"
                                    : "", label: secondButton, onSubmit: () => getAction(id, secondAction), bold: true, color: "#825beb", hoverColor: "#f3f0ff", outlined: true, padding: "0" })), buttonLabel && (_jsx(LibButton, { label: buttonLabel, onSubmit: () => getAction(id, action), bold: true, disabled: (action === "submitProposal" &&
                                    providerIds.includes(userData?._id)) ||
                                    (action === "seeOfferByAdmin" &&
                                        approvedQuotations.length > 0) }))] })] }, id));
        })) }));
};
export default Cards;
