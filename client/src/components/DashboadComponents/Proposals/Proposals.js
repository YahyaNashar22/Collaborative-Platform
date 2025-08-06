import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Proposals.module.css";
import useDebounceSearch from "../../../hooks/useDebounceSearch";
import LibButton from "../../../libs/common/lib-button/LibButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faCheck } from "@fortawesome/free-solid-svg-icons";
import { downloadFile } from "../../../services/FileUpload";
const Proposals = ({ data, onBack, isAdmin, onAcceptProposalByAdmin, onAcceptProposalByClient, }) => {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounceSearch(searchValue, 300);
    const [proposals] = useState(data);
    const [expandedIds, setExpandedIds] = useState([]);
    const [confirmedIds, setConfirmedIds] = useState([]);
    const isExpanded = (id) => expandedIds.includes(id);
    const shouldShowToggle = (desc) => desc.length > 100;
    const toggleDescription = (e, id) => {
        e.stopPropagation();
        setExpandedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    };
    const handleSearch = (value) => {
        setSearchValue(value);
    };
    const toggleConfirm = (proposalId) => {
        if (isAdmin) {
            setConfirmedIds((prev) => prev.includes(proposalId)
                ? prev.filter((id) => id !== proposalId)
                : [...prev, proposalId]);
        }
        else {
            setConfirmedIds((prev) => prev.includes(proposalId) ? [] : [proposalId]);
        }
    };
    const emitAcceptedProposals = () => {
        if (confirmedIds.length === 0)
            return;
        if (isAdmin) {
            onAcceptProposalByAdmin(confirmedIds, data[0].requestId);
        }
        else {
            onAcceptProposalByClient(confirmedIds[0], data[0].requestId);
        }
    };
    const isConfirmed = (id) => confirmedIds.includes(id);
    const filteredData = proposals.filter((proposal) => proposal.description
        .toLowerCase()
        .includes(debouncedSearchValue.toLowerCase()));
    return (_jsxs("main", { className: `${styles.wrapper} w-100`, children: [_jsx("div", { className: `${styles.header} d-f justify-between`, children: _jsx(TextInput, { placeholder: "Search by description...", type: "text", value: searchValue, name: "search_proposals", required: false, hasIcon: true, onChange: handleSearch }) }), _jsxs("h4", { className: styles.title, children: ["Proposals", " ", _jsxs("span", { style: { color: "var(--light-grey)" }, children: ["(", data.length, ")"] })] }), _jsx("div", { className: styles.content, children: _jsxs("div", { className: styles.gridWrapper, children: [_jsxs("div", { className: styles.gridContainer, children: [_jsxs("div", { className: `${styles.gridHeader} ${isAdmin ? styles.withProvider : styles.noProvider} d-f`, children: [_jsx("h4", { children: "Title" }), _jsx("h4", { children: "Deadline" }), _jsx("h4", { children: "Amount" }), _jsx("h4", { children: "File" }), isAdmin && _jsx("h4", { children: "Provider" }), _jsx("h4", { children: "Confirm" })] }), filteredData.map((proposal, idx) => {
                                    const confirmed = isConfirmed(proposal._id);
                                    return (_jsxs("div", { className: `${styles.gridRow} ${confirmed ? styles.confirmedRow : ""}  ${isAdmin ? styles.withProvider : styles.noProvider}`, children: [_jsxs("div", { className: `${styles.proposalInfo} d-f f-dir-col`, children: [_jsx("p", { title: proposal.title, onClick: (e) => toggleDescription(e, proposal._id), className: `${!isExpanded(proposal._id)
                                                            ? styles.ellipsis
                                                            : styles.expanded} ${styles.cell}`, children: proposal.description || "—" }), shouldShowToggle(proposal.description) && (_jsx("span", { onClick: (e) => toggleDescription(e, proposal._id), className: `${styles.toggleText} bold pointer`, children: isExpanded(proposal._id) ? "Show less" : "Show more" }))] }), _jsx("p", { className: styles.cell, children: proposal.estimatedDeadline?.[0] ?? "N/A" }), _jsxs("p", { className: styles.cell, children: [proposal.amount || "—", " $"] }), _jsx("p", { className: styles.cell, children: proposal.uploadedFile ? (_jsx("button", { onClick: (e) => {
                                                        e.stopPropagation();
                                                        downloadFile(proposal.uploadedFile);
                                                    }, className: styles.downloadLink, title: "Download file", type: "button", children: _jsx(FontAwesomeIcon, { icon: faDownload }) })) : ("—") }), isAdmin && (_jsx("p", { className: styles.cell, children: proposal.providerId ? (_jsxs(_Fragment, { children: [proposal.providerId.firstName, " ", proposal.providerId.lastName, _jsx("br", {}), _jsxs("small", { children: ["(", proposal.providerId.email, ")"] })] })) : ("—") })), _jsx("div", { className: `${styles.cell} d-f align-center`, children: _jsx("button", { className: `${styles.confirmToggle} ${confirmed ? styles.confirmedToggle : ""}`, onClick: () => toggleConfirm(proposal._id), type: "button", children: confirmed ? (_jsxs(_Fragment, { children: [_jsx(FontAwesomeIcon, { icon: faCheck }), _jsx("span", { children: "Confirmed" })] })) : (_jsx("span", { children: "Confirm" })) }) })] }, proposal._id ?? idx));
                                })] }), _jsxs("div", { className: "d-f gap-05 justify-end", children: [_jsx(LibButton, { label: "Back", onSubmit: onBack, backgroundColor: "#57417e", hoverColor: "#49356a", padding: "0 20px" }), _jsx(LibButton, { label: `Submit (${confirmedIds.length})`, onSubmit: emitAcceptedProposals, backgroundColor: "#4CAF50", hoverColor: "#3e9d3e", padding: "0 20px", disabled: confirmedIds.length === 0 })] })] }) })] }));
};
export default Proposals;
