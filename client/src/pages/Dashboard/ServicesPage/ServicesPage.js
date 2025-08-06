import { jsx as _jsx } from "react/jsx-runtime";
import Services from "../../../components/DashboadComponents/Services/Services";
import styles from "./ServicesPage.module.css";
const ServicesPage = () => {
    return (_jsx("div", { className: `${styles.wrapper} d-f w-100`, children: _jsx(Services, {}) }));
};
export default ServicesPage;
