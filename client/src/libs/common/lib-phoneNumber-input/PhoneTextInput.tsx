import { useEffect, useRef, useState } from "react";
import styles from "./PhoneTextInput.module.css";
import { countries } from "../../../data/Countries";

type CountryOption = {
  name: string;
  code: string; // ISO 2-letter
  dialCode: string;
};

type PhoneTextInputProps = {
  name: string;
  value: string;
  onChange: (value: string, name: string) => void;
  required?: boolean;
  disabled?: boolean;
  defaultCountry?: string;
  onBlur?: () => void;
};

const PhoneTextInput = ({
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  defaultCountry = "lb",
  onBlur,
}: PhoneTextInputProps) => {
  const initialCountry =
    countries.find((c) => c.code === defaultCountry) || countries[0];

  const [selectedCountry, setSelectedCountry] =
    useState<CountryOption>(initialCountry);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleCountrySelect = (country: CountryOption) => {
    setSelectedCountry(country);
    const stripped = value.replace(/^\+\d{1,4}/, "");
    const updated = country.dialCode + stripped;
    onChange(updated, name);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue, name);
    const match = countries.find((c) => newValue.startsWith(c.dialCode));
    if (match) setSelectedCountry(match);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.dialCode.includes(searchTerm)
  );

  return (
    <div
      className={`${styles.phoneContainer} d-f align-center`}
      ref={dropdownRef}
    >
      <div className={styles.dropdownWrapper}>
        <div
          className={`${styles.flagSelector} pointer`}
          onClick={toggleDropdown}
        >
          <span className={`flag-icon flag-icon-${selectedCountry.code}`} />
          <span className={styles.dialCode}>{selectedCountry.dialCode}</span>
          <span className={styles.arrow}>▾</span>
        </div>

        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <input
              type="text"
              placeholder="Search country..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className={styles.countryList}>
              {filteredCountries.map((country) => (
                <div
                  key={country.code}
                  className={styles.dropdownItem}
                  onClick={() => handleCountrySelect(country)}
                >
                  <span>{country.name}</span>
                  <span className={styles.dial}>{country.dialCode}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <input
        type="tel"
        name={name}
        required={required}
        disabled={disabled}
        value={value}
        onChange={handleInputChange}
        onBlur={onBlur}
        placeholder="Phone number"
        className={styles.phoneInput}
      />
    </div>
  );
};

export default PhoneTextInput;
