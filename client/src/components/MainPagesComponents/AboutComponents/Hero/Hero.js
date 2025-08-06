import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Hero.module.css";
import arrowRight from "../../../../assets/icons/arrow_right.png";
import HeroWrapper from "../../../../shared/HeroWrapper.tsx/HeroWrapper";
const Hero = () => {
    return (_jsx(HeroWrapper, { isAbout: true, children: _jsx("div", { className: `${styles.textContainer} d-f align-center justify-center f-dir-col `, children: _jsxs("h1", { className: styles.heroText, children: [_jsxs("div", { className: styles.firstSentence, children: [_jsx("span", { className: "circled", children: "GREAT" }), "BUSINESSES"] }), _jsx("div", { className: styles.strength, children: "ARE BUILD ON GREAT" }), _jsxs("div", { className: `${styles.arrow_container} d-f`, children: [_jsx("img", { src: arrowRight, className: styles.arrow, alt: "arrow-right" }), _jsx("span", { className: styles.soft, children: "REALTIONSHIPS" })] }), _jsx("div", { className: styles.last, children: "AND PARTNERSHIPS" })] }) }) }));
};
export default Hero;
