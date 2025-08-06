import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Contact.module.css";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faPinterestP, faTwitter, faWhatsapp, } from "@fortawesome/free-brands-svg-icons";
const Contact = () => {
    const articles = [
        {
            icon: faEnvelope,
            label: "Feel free to contact us via email or phone during our business hours.",
            path: "Info@Takatuf .com",
            href: "mailto:info@Takatuf.com",
        },
        {
            icon: faWhatsapp,
            label: "Our team will get back to you as soon as possible.",
            path: "+966 54 104 1901",
            href: "https://wa.me/+966541041901",
        },
    ];
    return (_jsxs("section", { className: `${styles.wrapper} container d-f align-center f-dir-col`, children: [_jsxs("div", { className: styles.headerContainer, children: [_jsx("h1", { className: styles.title, children: "CONTACT US" }), _jsxs("small", { className: styles.subTitle, children: ["Have a question or need support?", " "] })] }), _jsx("div", { className: `${styles.articleContainer} d-f align-center`, children: articles.map((elem, index) => (_jsxs("article", { className: `${styles.article} d-f align-center f-dir-col`, children: [_jsx(FontAwesomeIcon, { icon: elem.icon, size: "2xl", style: { color: "#825beb" } }), _jsx("p", { children: elem.label }), _jsx("a", { href: elem.href, className: "intense pointer", children: elem.path })] }, index))) }), _jsxs("ul", { className: `${styles.links} d-f align-center`, children: [_jsx("li", { children: _jsx("a", { href: "https://x.com/", children: _jsx(FontAwesomeIcon, { icon: faTwitter, size: "xl", style: { color: "#825beb" }, className: "pointer" }) }) }), _jsx("li", { children: _jsx("a", { href: "https://www.facebook.com/", children: _jsx(FontAwesomeIcon, { icon: faFacebook, size: "xl", style: { color: "#825beb" }, className: "pointer" }) }) }), _jsx("li", { children: _jsx("a", { href: "https://www.pinterest.com/", children: _jsx(FontAwesomeIcon, { icon: faPinterestP, size: "xl", style: { color: "#825beb" }, className: "pointer" }) }) }), _jsx("li", { children: _jsx("a", { href: "https://www.instagram.com/", children: _jsx(FontAwesomeIcon, { icon: faInstagram, size: "xl", style: { color: "#825beb" }, className: "pointer" }) }) })] })] }));
};
export default Contact;
