import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProposalRow.module.css";
import { faCircleCheck, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const ProposalRow = ({ id, image, title, description, deadline, status, price, isConfirmed, onRowClick, onConfirmationClick, }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleDescription = (e) => {
        e.stopPropagation(); // prevent triggering row click
        setIsExpanded((prev) => !prev);
    };
    const renderConfirmationIcon = () => {
        if (isConfirmed) {
            return (_jsx(FontAwesomeIcon, { icon: faCircleCheck, style: { color: "#44aa55" }, size: "lg" }));
        }
        if (status === "Pending") {
            return (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", fill: "none", stroke: "#666", strokeWidth: "24", width: "24", height: "20", children: _jsx("circle", { cx: "256", cy: "256", r: "208" }) }));
        }
    };
    const handleConfirmationClick = (e) => {
        e.stopPropagation();
        onConfirmationClick?.(id);
    };
    return (_jsxs("tr", { onClick: () => onRowClick?.(id), className: `${styles.row} pointer`, children: [_jsx("td", { children: _jsx("div", { className: `${styles.left} d-f align-center`, children: _jsxs("div", { className: `${styles.proposalInfo} d-f f-dir-col`, children: [_jsx("h4", { title: title, children: title }), _jsx("p", { title: description, onClick: toggleDescription, className: !isExpanded ? styles.ellipsis : styles.expanded, children: description }), _jsx("span", { onClick: toggleDescription, className: `${styles.toggleText} bold`, children: isExpanded ? "Show less" : "Show more" })] }) }) }), _jsx("td", { title: deadline, children: deadline }), _jsx("td", { title: status, children: _jsxs("span", { className: `${styles.status} ${styles[status.replace(/\s+/g, "").toLowerCase()]}`, children: [_jsx("span", { className: styles.dot }), status] }) }), _jsx("td", { title: price, children: price }), _jsx("td", { children: _jsxs("div", { className: "d-f", children: [_jsx("div", { onClick: handleConfirmationClick, children: renderConfirmationIcon() }), _jsx("div", { onClick: () => console.log("download"), children: _jsx(FontAwesomeIcon, { icon: faDownload, size: "lg", style: { color: "#6550b4" } }) })] }) })] }));
};
export default ProposalRow;
