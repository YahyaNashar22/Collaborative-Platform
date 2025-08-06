import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Services.module.css";
import box_1 from "../../../../assets/images/box_1.png";
import box_2 from "../../../../assets/images/box_2.png";
import box_3 from "../../../../assets/images/box_3.png";
import BoxCard from "../../../../shared/BoxCard/BoxCard";
const Services = () => {
    const boxesContent = [
        {
            image: box_1,
            title: "MARKETING SERVICE",
            alt: "MARKETING SERVICE",
        },
        {
            image: box_2,
            title: "FINANCIAL SERVICE",
            alt: "FINANCIAL SERVICE",
        },
        {
            image: box_3,
            title: "DIGITAL CONSULTING",
            alt: "DIGITAL CONSULTING",
        },
    ];
    return (_jsxs("section", { className: `${styles.wrapper} d-f w-100 justify-center align-center f-dir-col`, id: "market_place", children: [_jsx("h3", { className: "title", children: "SERVICES" }), _jsx("div", { className: `align-text ${styles.boxsContainer} d-f align-center`, children: boxesContent.map((box, index) => (_jsx(BoxCard, { image: box.image, alt: box.alt, title: box.title, status: "OPEN", providerName: "Provider name" }, index))) })] }));
};
export default Services;
