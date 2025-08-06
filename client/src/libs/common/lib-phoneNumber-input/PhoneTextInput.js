import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import styles from "./PhoneTextInput.module.css";
import { countries } from "../../../data/Countries";
const PhoneTextInput = ({ name, value, onChange, required = false, disabled = false, defaultCountry = "lb", onBlur, }) => {
    const initialCountry = countries.find((c) => c.code === defaultCountry) || countries[0];
    const [selectedCountry, setSelectedCountry] = useState(initialCountry);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);
    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        const stripped = value.replace(/^\+\d{1,4}/, "");
        const updated = country.dialCode + stripped;
        onChange(updated, name);
        setIsDropdownOpen(false);
        setSearchTerm("");
    };
    const handleClickOutside = (e) => {
        if (dropdownRef.current &&
            !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        onChange(newValue, name);
        const match = countries.find((c) => newValue.startsWith(c.dialCode));
        if (match)
            setSelectedCountry(match);
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const filteredCountries = countries.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.dialCode.includes(searchTerm));
    return (_jsxs("div", { className: `${styles.phoneContainer} d-f align-center`, ref: dropdownRef, children: [_jsxs("div", { className: styles.dropdownWrapper, children: [_jsxs("div", { className: `${styles.flagSelector} pointer`, onClick: toggleDropdown, children: [_jsx("span", { className: `flag-icon flag-icon-${selectedCountry.code}` }), _jsx("span", { className: styles.dialCode, children: selectedCountry.dialCode }), _jsx("span", { className: styles.arrow, children: "\u25BE" })] }), isDropdownOpen && (_jsxs("div", { className: styles.dropdown, children: [_jsx("input", { type: "text", placeholder: "Search country...", className: styles.searchInput, value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), _jsx("div", { className: styles.countryList, children: filteredCountries.map((country) => (_jsxs("div", { className: styles.dropdownItem, onClick: () => handleCountrySelect(country), children: [_jsx("span", { children: country.name }), _jsx("span", { className: styles.dial, children: country.dialCode })] }, country.code))) })] }))] }), _jsx("input", { type: "tel", name: name, required: required, disabled: disabled, value: value, onChange: handleInputChange, onBlur: onBlur, placeholder: "Phone number", className: styles.phoneInput })] }));
};
export default PhoneTextInput;
