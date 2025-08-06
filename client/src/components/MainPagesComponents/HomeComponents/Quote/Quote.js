import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Quote.module.css";
const Quote = () => {
    return (_jsx("section", { className: `${styles.wrapper} `, id: "quote", children: _jsxs("div", { className: `${styles.quoteContainer} d-f align-center justify-center w-100 f-dir-col w-100`, children: [_jsx("h1", { className: styles.header, children: "HOW IT WORKS" }), _jsx("p", { className: `align-text ${styles.quote}`, children: "Takatuf is a dynamic platform that connects partners to provide their services to the clients, enabling buyers to electronically submit purchase requests. These requests are then distributed to a vast network of authorized SMEs across Saudi Arabia, ensuring efficient procurement and seamless business transactions." })] }) }));
};
export default Quote;
