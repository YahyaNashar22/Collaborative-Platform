import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./PlanBox.module.css";
const PlanBox = ({ icon, label, isSelected, step, onClick, description, }) => (_jsxs("div", { className: `${styles.avatarBox} ${step === 0 ? `${styles.allowHover} pointer` : ""} ${isSelected ? styles.selected : ""} d-f f-dir-col align-center`, onClick: onClick, children: [_jsx("div", { className: `${styles.avatar} d-f align-center justify-center`, children: _jsx(FontAwesomeIcon, { icon: icon, size: "2xl", style: { color: "#b6c3f8" } }) }), _jsx("div", { className: styles.avatarTitle, children: label }), step === 0 && (_jsxs("small", { className: "text-align-center", children: [" ", description.split("\n").map((line, index) => (_jsxs(React.Fragment, { children: [line, _jsx("br", {})] }, index)))] }))] }));
export default PlanBox;
