import { Link } from "react-router-dom";
import styles from "./ClientSignupPage.module.css";
import { countries } from "../../utils/countries";
import { FormEvent, useState } from "react";

const ClientSignupPage = () => {
  // error handler
  // const [error, setError] = useState<string | null>();
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
    return true;
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
      <h1 className={styles.title}>Welcome Aboard!</h1>
      <h2 className={styles.subtitle}>
        We're looking forward to elevate you business
      </h2>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <label className={styles.inputLabel}>
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
            className={`${styles.verifyBtn} pointer`}
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
          <input type="file" className={styles.input} required />
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
          How soon would you like to get our services
          <select className={styles.input} value={"immediately"} required>
            <option value={"immediately"}>immediately</option>
            <option value={"within a month"}>within a month</option>
            <option value={"in the next 2-3 months"}>
              in the next 2-3 months
            </option>
            <option value={"in the next 4-6 months"}>
              in the next 4-6 months
            </option>
            <option value={"in the next 6-12 months"}>
              in the next 6-12 months
            </option>
            <option value={"others"}>others</option>
          </select>
        </label>

        <label className={styles.inputLabel}>
          Estimated Budget
          <input
            type="text"
            className={styles.input}
            placeholder="700$"
            required
          />
        </label>

        <label className={styles.inputLabel}>
          Scope of work
          <input type="file" className={styles.input} required />
        </label>

        <div className={styles.btnContainer}>
          <Link to={"/"} className={`${styles.back} pointer`}>
            Back
          </Link>
          <button type="submit" className={`${styles.join} pointer`}>
            Join
          </button>
        </div>
      </form>
    </main>
  );
};

export default ClientSignupPage;
