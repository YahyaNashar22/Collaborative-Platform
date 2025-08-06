import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Strategy.module.css";
import experience from "../../../../assets/images/experience_commitment_b.jpg";
import business from "../../../../assets/images/business_empowrement_b.jpg";
import global from "../../../../assets/images/global_expertise_b.jpg";
import strategic from "../../../../assets/images/strategtic_support_b.jpg";
const strategyData = [
    {
        image: experience,
        alt: "experience commitment",
        title: "EMPOWER BUSINESS",
        description: "Facilitate access to high-quality consultancy services that enhance decision-making and operational efficiency.",
    },
    {
        image: business,
        alt: "business empowerment",
        title: "PROMOTE INNOVATION",
        description: "Support businesses in adopting cutting-edge solutions that align with the latest market trends.",
    },
    {
        image: global,
        alt: "global expertise",
        title: "EXPAND GLOBAL ACCESS",
        description: "Provide a gateway for international firms to enter and thrive in the Saudi market.",
    },
    {
        image: strategic,
        alt: "strategic support",
        title: "SUPPORT ECONOMIC GROWTH",
        description: "Contribute to Vision 2030 by fostering local and international investments in Saudi Arabia.",
    },
];
const Strategy = () => {
    return (_jsxs("section", { className: styles.wrapper, id: "market_place", children: [_jsxs("div", { className: styles.header, children: [_jsxs("h3", { className: styles.title, children: ["OUR STRATEGIC ", _jsx("span", { className: "purple", children: "OBJECTIVES" })] }), _jsx("p", { className: styles.subTitle, children: "We help our clients renew their business" })] }), _jsx("div", { className: styles.cardsContainer, children: strategyData.map((item, index) => (_jsxs("div", { className: styles.card, children: [_jsxs("div", { className: styles.imageWrapper, children: [_jsx("img", { src: item.image, alt: item.alt, className: styles.cardImg }), _jsx("div", { className: styles.cardOverlay, children: _jsx("p", { className: styles.cardTitle, children: item.title }) })] }), _jsx("p", { className: styles.cardDescription, children: item.description })] }, index))) })] }));
};
export default Strategy;
