import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import HeroWrapper from "../../../../shared/HeroWrapper.tsx/HeroWrapper";
import styles from "./Hero.module.css";
import { useOutletContext } from "react-router-dom";
const Hero = () => {
    const { user } = useOutletContext();
    return (_jsx(HeroWrapper, { children: _jsxs("div", { className: "d-f f-dir-col justify-center", children: [_jsxs("h1", { className: styles.heroText, children: ["WELCOME TO ", _jsx("span", { className: "purple", children: "TAKATUF" }), _jsx("div", { children: "PLATFORM" })] }), !user && (_jsxs("div", { className: `${styles.boxContainer} d-f align-center`, children: [_jsxs("div", { className: `${styles.box} ${styles.leftBox} d-f f-dir-col align-center w-100`, children: [_jsx(Link, { to: "/auth/provider", className: "w-100 pointer", children: "BECOME A PARTNER" }), _jsx("p", { children: "Become a Partner In 6 Steps to grow your business" })] }), _jsxs("div", { className: `${styles.box} d-f f-dir-col align-center w-100`, children: [_jsx(Link, { to: "/auth/client", className: "w-100 pointer", children: "BECOME A CLIENT" }), _jsx("p", { children: "Become a client In 3 Steps to Settle your project" })] })] }))] }) }));
};
export default Hero;
