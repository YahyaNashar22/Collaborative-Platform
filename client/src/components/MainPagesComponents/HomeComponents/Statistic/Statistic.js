import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Statistic.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCode, faPeopleGroup, } from "@fortawesome/free-solid-svg-icons";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
const Statistic = () => {
    const statisticContent = [
        {
            icon: faPeopleGroup,
            number: "+1000",
            label: "Satisfied Clients",
        },
        {
            icon: faMapLocationDot,
            number: "+3500",
            label: "Website Visits",
        },
        {
            icon: faFileCode,
            number: "+1000",
            label: "Projects Done",
        },
    ];
    return (_jsx("section", { className: `${styles.wrapper} d-f align-center justify-center`, id: "statistic", children: statisticContent.map((elem, index) => (_jsxs("div", { className: `${styles.element} d-f align-end`, children: [_jsx(FontAwesomeIcon, { size: "2xl", icon: elem.icon, style: { color: "#000000" }, className: styles.icon }), _jsxs("div", { className: `${styles.elementText} d-f align-start f-dir-col`, children: [_jsx("h1", { children: elem.number }), _jsx("small", { className: "bold", children: elem.label })] })] }, index))) }));
};
export default Statistic;
