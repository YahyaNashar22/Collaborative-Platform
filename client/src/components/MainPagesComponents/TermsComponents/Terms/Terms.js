import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Menu from "../../../../shared/Menu/Menu";
import styles from "./Terms.module.css";
const Terms = () => {
    const data = [
        {
            label: "Scope of Application",
            content: "These terms apply to all users of the Takatuf Platform, including clients and service providers. They cover service requests, quotes, and payments. Using the platform means you agree to these terms.",
        },
        {
            label: "Definitions",
            content: "‘Client’ refers to any individual or entity requesting a service. ‘Service Provider’ means the individual or entity offering consultancy services. ‘Platform’ refers to the Takatuf digital system.",
        },
        {
            label: "Tax Obligations",
            content: "Service providers are solely responsible for declaring and paying any applicable taxes. Takatuf does not deduct or handle tax payments on behalf of users. Users must comply with their local tax laws.",
        },
        {
            label: "Account Creation and Platform Use",
            content: "Users must create an account to access services on the platform. Each user is responsible for maintaining the confidentiality of their account. Misuse or fraudulent activity may lead to suspension or termination.",
        },
        {
            label: "Registration and Access",
            content: "Registration requires accurate and up-to-date information. Takatuf may verify identities and reject or revoke access if misuse is detected. Access is granted at the platform's discretion.",
        },
        {
            label: "Information Accuracy",
            content: "All information provided by users must be truthful and accurate. Takatuf is not responsible for errors or false claims by users. Providing false data may result in account suspension.",
        },
        {
            label: "Notifications and Communication",
            content: "Takatuf may send updates or service-related notifications via email or in-platform messages. Users are responsible for keeping their contact details current. All communication through the platform is considered official.",
        },
        {
            label: "Client–Provider Interaction",
            content: "Clients and service providers must communicate clearly and professionally. Takatuf only facilitates the connection and does not manage the actual service delivery. Disputes should be handled respectfully or reported to support.",
        },
    ];
    return (_jsxs("div", { className: `${styles.wrapper} d-f `, children: [_jsxs("div", { className: `${styles.left} d-f f-dir-col align-start`, children: [_jsx("h1", { className: "title", children: "Terms and Conditions" }), _jsx("p", { className: "bold align-text", children: "Takatuf Platform is a digital system specialized in offering digital brokerage services across various consultancy fields (such as finance, accounting, IT, design, marketing, and more). The platform is designed to facilitate the connection between clients and service providers through an integrated process that includes service requests, receiving quotes, and final approval between both parties. It also monitors service execution and ensures financial collection upon payment, acting as a mediator linking various parties (companies, offices, individuals both inside and outside the Kingdom) to meet the needs of clients from the private sector, public sector, or individuals." })] }), _jsx("div", { className: "w-100", children: _jsx(Menu, { data: data }) })] }));
};
export default Terms;
