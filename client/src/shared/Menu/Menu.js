import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./Menu.module.css";
const Menu = ({ data }) => {
    const [collapsesItems, setCollapsesItems] = useState([]);
    const handleClick = (itemIndex) => {
        if (collapsesItems.includes(itemIndex)) {
            setCollapsesItems((prev) => prev.filter((elem) => elem !== itemIndex));
        }
        else {
            setCollapsesItems((prev) => [...prev, itemIndex]);
        }
    };
    return (_jsx("ul", { className: `${styles.wrapper} d-f f-dir-col`, children: data.map((term, index) => (_jsxs("div", { className: `${styles.containerItem} ${collapsesItems.includes(index) ? styles.collapsas : ""}`, children: [_jsxs("li", { className: `${styles.item} d-f align-center justify-between w-100 pointer`, onClick: () => handleClick(index), children: [_jsx("div", { className: `bold ${styles.left}`, children: term.label }), _jsx("div", { className: `${styles.right} purple`, children: ">" })] }), _jsx("div", { className: `${styles.collapsesContent} ${collapsesItems.includes(index) ? styles.show : ""} align-text`, children: term.content })] }, index))) }));
};
export default Menu;
