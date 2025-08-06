import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import ProposalRow from "../ProposalRow/ProposalRow";
import styles from "./ProposalTable.module.css";
const ProposalTable = ({ data, onRowClick, onConfirmationClick, }) => {
    return (_jsxs("table", { className: `${styles.table} w-100`, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsxs("th", { className: styles.title, children: ["Proposals ", "  ", _jsxs("span", { style: { color: "var(--light-grey)" }, children: ["(", data.length, ")"] })] }), _jsx("th", { className: styles.title, children: "Deadline" }), _jsx("th", { className: styles.title, children: "Status" }), _jsx("th", { className: styles.title, children: "Price" }), _jsx("th", { className: styles.title, children: "Confirmation" })] }) }), _jsx("tbody", { children: data.map((proposal, idx) => (_jsx(ProposalRow, { id: proposal.id ?? idx, image: proposal.image, title: proposal.title, description: proposal.description, deadline: proposal.deadline, status: proposal.status, price: proposal.price, isConfirmed: proposal.isConfirmed, onRowClick: () => onRowClick?.(proposal.id), onConfirmationClick: (id) => onConfirmationClick?.(id) }, proposal.id ?? idx))) })] }));
};
export default ProposalTable;
