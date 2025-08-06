import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Menu from "../../../../shared/Menu/Menu";
import styles from "./FAQ.module.css";
const FAQ = () => {
    const faqData = [
        {
            label: "What industries do you specialize in?",
            content: "We specialize in a variety of fields including finance, accounting, IT, design, marketing, and more. Our goal is to match clients with the most suitable consultants.",
        },
        {
            label: "How do I find a consultant on your platform?",
            content: "Simply submit a service request with your needs. Our platform will connect you with qualified consultants who will provide quotes and proposals.",
        },
        {
            label: "Do you cater to international businesses?",
            content: "Yes, Takatuf connects consultants and clients locally and internationally. We serve clients and providers both inside and outside the Kingdom.",
        },
        {
            label: "Are your consultancy services affordable?",
            content: "Takatuf allows you to receive multiple offers, helping you choose based on quality and budget. Pricing depends on the nature and complexity of the service.",
        },
        {
            label: "What often will results be reported?",
            content: "Progress and results depend on the project type. However, you can monitor service execution directly through your dashboard or communicate with the provider at any time.",
        },
        {
            label: "What types of consulting services do you offer?",
            content: "We support a wide range of consulting services such as business development, IT solutions, marketing strategies, graphic design, and financial advisory.",
        },
    ];
    return (_jsxs("div", { className: `${styles.wrapper} d-f `, children: [_jsx("div", { className: `${styles.left} d-f f-dir-col align-start`, children: _jsx("h1", { className: "title", children: "Frequently Asked Questions" }) }), _jsx("div", { className: "w-100", children: _jsx(Menu, { data: faqData }) })] }));
};
export default FAQ;
