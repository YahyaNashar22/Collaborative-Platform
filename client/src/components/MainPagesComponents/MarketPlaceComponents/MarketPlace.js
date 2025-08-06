import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./MarketPlace.module.css";
import BoxCard from "../../../shared/BoxCard/BoxCard";
import box_1 from "../../../assets/images/box_1.png";
import Window from "../../../libs/common/lib-window/Window";
import LibButton from "../../../libs/common/lib-button/LibButton";
const MarketPlace = () => {
    const serviceProvidersData = [
        {
            id: "1",
            label: "Web Design Co.",
            value: "web-design",
            isChecked: false,
            status: "open",
            duration: "3 weeks",
            providerName: "PixelCraft Agency",
        },
        {
            id: "2",
            label: "SEO Experts",
            value: "seo-experts",
            isChecked: false,
            status: "closed",
            duration: "2 weeks",
            providerName: "RankBoosters Ltd.",
        },
        {
            id: "3",
            label: "Cloud Solutions Ltd.",
            value: "cloud-solutions",
            isChecked: true,
            status: "open",
            duration: "4 weeks",
            providerName: "NimbusTech",
        },
        {
            id: "4",
            label: "Mobile App Gurus",
            value: "mobile-app",
            isChecked: true,
            status: "open",
            duration: "5 weeks",
            providerName: "Appsmiths",
        },
        {
            id: "5",
            label: "E-Commerce Pros",
            value: "ecommerce",
            isChecked: false,
            status: "closed",
            duration: "3 weeks",
            providerName: "ShopCore Inc.",
        },
        {
            id: "6",
            label: "Digital Marketing Hub",
            value: "digital-marketing",
            isChecked: true,
            status: "open",
            duration: "2 weeks",
            providerName: "BuzzReach Media",
        },
        {
            id: "7",
            label: "CyberSec Experts",
            value: "cybersecurity",
            isChecked: false,
            status: "closed",
            duration: "6 weeks",
            providerName: "ShieldNet Solutions",
        },
        {
            id: "8",
            label: "UI/UX Studios",
            value: "ui-ux",
            isChecked: true,
            status: "open",
            duration: "2 weeks",
            providerName: "DesignFlow Studio",
        },
        {
            id: "9",
            label: "Data Analytics Firm",
            value: "data-analytics",
            isChecked: true,
            status: "open",
            duration: "3 weeks",
            providerName: "InsightBridge",
        },
        {
            id: "10",
            label: "DevOps Solutions",
            value: "devops",
            isChecked: true,
            status: "closed",
            duration: "4 weeks",
            providerName: "OpsWave",
        },
        {
            id: "11",
            label: "CRM Integrators",
            value: "crm",
            isChecked: true,
            status: "open",
            duration: "2 weeks",
            providerName: "ConnectSuite",
        },
        {
            id: "12",
            label: "AI Automation Inc.",
            value: "ai-automation",
            isChecked: true,
            status: "open",
            duration: "3 weeks",
            providerName: "NeuralLabs AI",
        },
    ];
    const [searchValue, setSearchValue] = useState("");
    const [serviceProviders, setServiceProviders] = useState(serviceProvidersData);
    const [openWindow, setOpenWindow] = useState({});
    const handleSearch = (e) => {
        const value = e;
        setSearchValue(value);
    };
    const handleFilterChange = (index) => {
        setServiceProviders((prev) => prev.map((service, i) => i === index ? { ...service, isChecked: !service.isChecked } : service));
    };
    const handleBoxClick = (id) => {
        const selectedItem = serviceProviders.find((service) => service.id === id);
        if (!selectedItem)
            return;
        setOpenWindow(selectedItem);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: `${styles.wrapper} container d-f `, children: [_jsxs("div", { className: `${styles.leftSidePanel} d-f f-dir-col`, children: [_jsx("h2", { children: "Category" }), _jsx("div", { className: styles.category, children: serviceProviders.map((service, index) => (_jsxs("div", { className: `${styles.serviceItem} d-f align-center bold pointer`, onClick: () => handleFilterChange(index), children: [_jsx("input", { type: "checkbox", name: service.label, value: service.value, id: service.id, checked: serviceProviders[index].isChecked, className: "pointer" }), _jsx("label", { className: "pointer", children: service.label })] }, service.id))) })] }), _jsxs("div", { className: styles.content, children: [_jsx("div", { className: styles.header, children: _jsx(TextInput, { placeholder: "Search", type: "text", value: searchValue, name: "search_projects", required: false, hasIcon: true, onChange: (e) => handleSearch(e) }) }), _jsx("div", { className: `${styles.servicesContainer}`, children: serviceProviders
                                    .filter((service) => service.isChecked &&
                                    service.label
                                        .toLowerCase()
                                        .includes(searchValue.toLowerCase()))
                                    .map((service) => (_jsx("div", { className: `${styles.serviceItem} pointer`, onClick: () => handleBoxClick(service.id), children: _jsx(BoxCard, { size: "small", image: box_1, alt: service.label, title: service.label, duration: service.duration, providerName: service.providerName, status: service.status }) }, service.id))) })] })] }), _jsx(Window, { title: openWindow?.label || "Service Details", visible: Object.values(openWindow).length > 0, onClose: () => setOpenWindow({}), children: _jsxs("div", { className: `${styles.boxDetails} d-f f-dir-col`, children: [_jsxs("div", { children: [_jsx("h3", { children: "Published Date:" }), _jsx("p", { children: "18th Jun" })] }), _jsxs("div", { children: [_jsx("h3", { children: "Category:" }), _jsx("p", { children: openWindow?.label })] }), _jsxs("div", { children: [_jsx("h3", { children: "Provider Name:" }), _jsx("p", { children: openWindow?.providerName })] }), _jsxs("div", { children: [_jsx("h3", { children: "Status:" }), _jsx("p", { style: {
                                        color: openWindow?.status === "open" ? "green" : "gray",
                                    }, children: openWindow?.status })] }), _jsxs("div", { children: [_jsx("h3", { children: "Duration:" }), _jsx("p", { children: openWindow?.duration })] }), _jsxs("div", { className: "d-f justify-between align-center mt-3", children: [_jsx(LibButton, { label: "Not Interested", backgroundColor: "var(--light-grey)", hoverColor: "#d1d1d1", onSubmit: () => { } }), _jsx(LibButton, { label: "Interested", onSubmit: () => { } })] })] }) })] }));
};
export default MarketPlace;
