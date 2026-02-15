import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Contact.module.css";
import {
  faArrowRight,
  faEnvelope,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faPinterestP,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ContactItem {
  icon: IconDefinition;
  label: string;
  path: string;
  href: string;
}

const Contact = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const articles: ContactItem[] = [
    {
      icon: faEnvelope,
      label:
        t("Feel free to contact us via email or phone during our business hours."),
      path: "Info@Takatuf .com",
      href: "mailto:info@Takatuf.com",
    },
    {
      icon: faWhatsapp,
      label: t("Our team will get back to you as soon as possible."),
      path: "+966 54 104 1901",
      href: "https://wa.me/+966541041901",
    },
  ];
  return (
    <section
      className={`${styles.wrapper} container d-f align-center f-dir-col`}
    >
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>{t("CONTACT US")}</h1>
        <small className={styles.subTitle}>
          {t("Have a question or need support?")}{" "}
        </small>
      </div>

      <div className={`${styles.articleContainer} d-f align-center`}>
        {articles.map((elem: ContactItem, index: number) => (
          <article
            className={`${styles.article} d-f align-center f-dir-col`}
            key={index}
          >
            <FontAwesomeIcon
              icon={elem.icon}
              size="2xl"
              style={{ color: "#825beb" }}
            />
            <p>{elem.label}</p>
            <a href={elem.href} className="intense pointer">
              {elem.path}
            </a>
          </article>
        ))}
      </div>
      <div className={`d-f align-center pointer ${styles.contactUsBtn}`}>
        <LibButton
          label={t("Contact Us")}
          onSubmit={() => navigate("/contact")}
          bold={true}
          styleClass="rounded"
          hoverColor="transparent"
        />
        <FontAwesomeIcon
          icon={faArrowRight}
          size="lg"
          style={{ color: "#ffffff" }}
          className={styles.flagWave}
        />
      </div>
      <ul className={`${styles.links} d-f align-center`}>
        <li>
          <a href="https://x.com/">
            <FontAwesomeIcon
              icon={faXTwitter}
              size="xl"
              style={{ color: "#825beb" }}
              className="pointer"
            />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/">
            <FontAwesomeIcon
              icon={faFacebook}
              size="xl"
              style={{ color: "#825beb" }}
              className="pointer"
            />
          </a>
        </li>
        <li>
          <a href="https://www.pinterest.com/">
            <FontAwesomeIcon
              icon={faPinterestP}
              size="xl"
              style={{ color: "#825beb" }}
              className="pointer"
            />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/">
            <FontAwesomeIcon
              icon={faInstagram}
              size="xl"
              style={{ color: "#825beb" }}
              className="pointer"
            />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Contact;
