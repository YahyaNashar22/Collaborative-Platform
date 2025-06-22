import { Link } from "react-router-dom";

import { countries } from "../../utils/countries";

import styles from "./ProviderSignupPage.module.css";
import { FormEvent, useState } from "react";

const ProviderSignupPage = () => {
  // error handler
  //   const [error, setError] = useState<string | null>();
  // open verification input
  const [showVerifyPhone, setShowVerifyPhone] = useState<boolean>(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState<boolean>(false);

  // functions to send verification code
  const sendPhoneVerification = () => {
    setShowVerifyPhone(true);
  };

  const sendEmailVerification = () => {
    setShowVerifyEmail(true);
  };

  // functions to verify codes
  const verifyPhone = (): boolean => {
    return false;
  };

  const verifyEmail = (): boolean => {
    return true;
  };

  // submit form handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className={styles.wrapper}>
      {" "}
      <main className={styles.wrapper}>
        <h1 className={styles.title}>Welcome Aboard!</h1>
        <h2 className={styles.subtitle}>
          We're looking forward to have you on the team
        </h2>

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <label className={`${styles.inputLabel} pointer`}>
            First Name
            <input
              type="text"
              className={styles.input}
              placeholder="First Name"
              required
            />
          </label>

          <label className={styles.inputLabel}>
            Last Name
            <input
              type="text"
              className={styles.input}
              placeholder="last Name"
              required
            />
          </label>

          <fieldset className={styles.verificationWrapper}>
            <label className={styles.inputLabel}>
              Email
              <input
                type="email"
                className={styles.input}
                placeholder="email@domain.com"
                required
              />
            </label>
            {showVerifyEmail && (
              <input
                type="text"
                className={`${styles.input} ${
                  verifyEmail() ? styles.verified : styles.error
                }`}
                placeholder="Enter Verification Code"
                onChange={verifyEmail}
                required
              />
            )}
            <button
              type="button"
              className={styles.verifyBtn}
              onClick={sendEmailVerification}
            >
              Verify
            </button>
          </fieldset>

          <label className={styles.inputLabel}>
            Password
            <input type="password" className={styles.input} required />
          </label>

          <fieldset className={styles.verificationWrapper}>
            <label className={styles.inputLabel}>
              Phone
              <input
                type="text"
                className={styles.input}
                placeholder="+1 123 123 123"
                required
              />
            </label>
            {showVerifyPhone && (
              <input
                type="text"
                className={`${styles.input} ${
                  verifyPhone() ? styles.verified : styles.error
                }`}
                placeholder="Enter Verification Code"
                onChange={verifyPhone}
                required
              />
            )}
            <button
              type="button"
              className={styles.verifyBtn}
              onClick={sendPhoneVerification}
            >
              Verify
            </button>
          </fieldset>

          <label className={styles.inputLabel}>
            Profile Picture
            <input type="file" className={styles.input} />
          </label>

          <label className={styles.inputLabel}>
            Company
            <select className={styles.input} value={"company"} required>
              <option value={"company"}>Company</option>
              <option value={"individual"}>Individual</option>
            </select>
          </label>

          <label className={styles.inputLabel}>
            Country
            <select className={styles.input} required>
              {countries.map((country) => {
                return (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                );
              })}
            </select>
          </label>

          <label className={styles.inputLabel}>
            Address
            <input
              type="text"
              className={styles.input}
              placeholder="State, street"
              required
            />
          </label>

          <label className={styles.inputLabel}>
            Language
            <select className={styles.input} value={"english"} required>
              <option value={"english"}>English</option>
              <option value={"arabic"}>Arabic</option>
              <option value={"english-arabic"}>English + Arabic</option>
            </select>
          </label>

          <label className={styles.inputLabel}>
            Experience
            <textarea
              className={styles.input}
              placeholder="Share a brief description about yourself"
              aria-multiline
              rows={10}
              required
            />
          </label>

          <label className={styles.inputLabel}>
            CV or Company Profile
            <input type="file" className={styles.input} required />
          </label>

          <label className={styles.inputLabel}>
            Services
            <div className={styles.checkboxContainer}>
              {services.map((service, index) => (
                <label
                  key={index}
                  className={`${styles.checkboxLabel} pointer`}
                >
                  <input
                    type="checkbox"
                    className={`${styles.checkbox} pointer`}
                    value={service}
                    name={service}
                  />
                  {service}
                </label>
              ))}
            </div>
          </label>

          <div className={styles.btnContainer}>
            <Link to={"/"} className={styles.back}>
              Back
            </Link>
            <button type="submit" className={styles.join}>
              Join
            </button>
          </div>
        </form>
      </main>
    </main>
  );
};

export default ProviderSignupPage;

const services = [
  "Web Development",
  "Graphic Design",
  "Digital Marketing",
  "SEO Optimization",
  "Consulting",
  "Content Writing",
]; // replace this with the backend
