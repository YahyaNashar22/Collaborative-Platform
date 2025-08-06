import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Subscribe.module.css";
import { useState } from "react";
const Subscribe = () => {
    const [email, setEmail] = useState();
    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        setEmail("");
        // implement this if the client adds newsletter service
    }
    return (_jsxs("section", { className: `${styles.wrapper} d-f align-center justify-center`, id: "terms", children: [_jsxs("h2", { className: styles.title, children: ["WE'RE DELIVERING THE BEST ", _jsx("br", {}), " CUSTOMER EXPERIENCE"] }), _jsxs("form", { className: styles.subscribeContainer, onSubmit: handleSubmit, children: [_jsx("input", { type: "email", className: styles.subscribeInput, placeholder: "Enter your email", value: email, onChange: handleEmail }), _jsx("button", { type: "submit", className: `${styles.subscribeBtn} pointer`, children: "Subscribe" })] })] }));
};
export default Subscribe;
