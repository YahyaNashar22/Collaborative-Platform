import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./Footer.module.css";
import dial from "../../assets/icons/dial.png";
import mail from "../../assets/icons/mail.png";
import twitter from "../../assets/icons/twitter.png";
import facebook from "../../assets/icons/facebook.png";
import pinterest from "../../assets/icons/pinterest.png";
import instagram from "../../assets/icons/instagram.png";
import logo from "../../assets/icons/logo_fullWhite.png";
import { Link } from "react-router-dom";
const Footer = () => {
    const [email, setEmail] = useState();
    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        setEmail("");
        // implement this if the client adds newsletter service
    }
    return (_jsxs("footer", { className: `${styles.wrapper} d-f align-center justify-center f-dir-col`, children: [_jsxs("div", { className: styles.upper, children: [_jsxs("div", { className: styles.left, children: [_jsx("img", { src: logo, width: 180, height: 64, alt: "logo", className: styles.logo }), _jsxs("div", { className: styles.details, children: [_jsx("p", { className: styles.logoText, children: "Welcome to Takatuf!" }), _jsxs("ul", { className: styles.infoContainer, children: [_jsxs("li", { className: `${styles.infoItem} pointer`, children: [_jsx("img", { src: dial, width: 16, height: 16, alt: "dial" }), _jsx("a", { href: "https://wa.me/+966541041901", children: "00 966 54 104 1901" })] }), _jsxs("li", { className: `${styles.infoItem} pointer`, children: [_jsx("img", { src: mail, width: 16, height: 16, alt: "mail" }), _jsx("a", { href: "mailto:info@collaborative-cc.com", children: "info@collaborative-cc.com" })] })] })] })] }), _jsxs("div", { className: styles.middle, children: [_jsx("p", { className: styles.blockHeader, children: "Explore" }), _jsxs("ul", { className: styles.supportContainer, children: [_jsx("li", { className: styles.supportItem, children: _jsx(Link, { to: "/faq", children: "FAQ" }) }), _jsx("li", { className: styles.supportItem, children: _jsx("a", { href: "mailto:info@collaborative-cc.com", children: "Contact" }) })] })] }), _jsxs("div", { className: styles.right, children: [_jsx("p", { className: styles.blockHeader, children: "NEWSLETTER" }), _jsx("form", { className: styles.newsLetterForm, onSubmit: handleSubmit, children: _jsxs("label", { className: styles.newsletterLabel, children: ["Subscribe to our latest articles and resources", _jsx("input", { type: "email", name: "email", placeholder: "Email address", onChange: handleEmail, value: email, className: styles.emailInput }), _jsx("button", { className: `${styles.newsletterSubmit} pointer`, type: "submit", children: "REGISTER" })] }) })] })] }), _jsxs("div", { className: styles.lower, children: [_jsx("p", { children: "\u00A9 2025 Collaborative Platform. All rights reserved." }), _jsxs("ul", { className: styles.links, children: [_jsx("li", { className: styles.link, children: _jsx("a", { href: "https://x.com/", children: _jsx("img", { src: twitter, width: 16, height: 16, alt: "twitter" }) }) }), _jsx("li", { className: styles.link, children: _jsx("a", { href: "https://www.facebook.com/", children: _jsx("img", { src: facebook, width: 16, height: 16, alt: "facebook" }) }) }), _jsx("li", { className: styles.link, children: _jsx("a", { href: "https://www.pinterest.com/", children: _jsx("img", { src: pinterest, width: 16, height: 16, alt: "pinterest" }) }) }), _jsx("li", { className: styles.link, children: _jsx("a", { href: "https://www.instagram.com/", children: _jsx("img", { src: instagram, width: 16, height: 16, alt: "instagram" }) }) })] })] })] }));
};
export default Footer;
