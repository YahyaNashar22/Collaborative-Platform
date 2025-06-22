import { ChangeEvent, FormEvent, useState } from "react";

import styles from "./Footer.module.css";

import dial from "../../assets/icons/dial.png";
import mail from "../../assets/icons/mail.png";
import twitter from "../../assets/icons/twitter.png";
import facebook from "../../assets/icons/facebook.png";
import pinterest from "../../assets/icons/pinterest.png";
import instagram from "../../assets/icons/instagram.png";
import logo from "../../assets/icons/logo_fullWhite.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState<string>();

  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmail("");
    // implement this if the client adds newsletter service
  }
  return (
    <footer
      className={`${styles.wrapper} d-f align-center justify-center f-dir-col`}
    >
      <div className={styles.upper}>
        <div className={styles.left}>
          <img
            src={logo}
            width={180}
            height={64}
            alt="logo"
            className={styles.logo}
          />
          <div className={styles.details}>
            <p className={styles.logoText}>Welcome to Takatuf!</p>
            <ul className={styles.infoContainer}>
              <li className={`${styles.infoItem} pointer`}>
                <img src={dial} width={16} height={16} alt="dial" />
                <a href="https://wa.me/+966541041901">00 966 54 104 1901</a>
              </li>
              <li className={`${styles.infoItem} pointer`}>
                <img src={mail} width={16} height={16} alt="mail" />
                <a href="mailto:info@collaborative-cc.com">
                  info@collaborative-cc.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.middle}>
          <p className={styles.blockHeader}>Explore</p>
          <ul className={styles.supportContainer}>
            <li className={styles.supportItem}>
              <Link to="/faq">FAQ</Link>
            </li>
            <li className={styles.supportItem}>
              <a href="mailto:info@collaborative-cc.com">Contact</a>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          <p className={styles.blockHeader}>NEWSLETTER</p>
          <form className={styles.newsLetterForm} onSubmit={handleSubmit}>
            <label className={styles.newsletterLabel}>
              Subscribe to our latest articles and resources
              <input
                type="email"
                name="email"
                placeholder="Email address"
                onChange={handleEmail}
                value={email}
                className={styles.emailInput}
              />
              <button
                className={`${styles.newsletterSubmit} pointer`}
                type="submit"
              >
                REGISTER
              </button>
            </label>
          </form>
        </div>
      </div>

      <div className={styles.lower}>
        <p>&copy; 2025 Collaborative Platform. All rights reserved.</p>
        <ul className={styles.links}>
          <li className={styles.link}>
            <a href="https://x.com/">
              <img src={twitter} width={16} height={16} alt="twitter" />
            </a>
          </li>

          <li className={styles.link}>
            <a href="https://www.facebook.com/">
              <img src={facebook} width={16} height={16} alt="facebook" />
            </a>
          </li>

          <li className={styles.link}>
            <a href="https://www.pinterest.com/">
              <img src={pinterest} width={16} height={16} alt="pinterest" />
            </a>
          </li>

          <li className={styles.link}>
            <a href="https://www.instagram.com/">
              <img src={instagram} width={16} height={16} alt="instagram" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
