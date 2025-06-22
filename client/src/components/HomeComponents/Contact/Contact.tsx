import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Contact.module.css";
import { faEnvelope, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faPinterestP,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

interface ContactItem {
  icon: IconDefinition;
  label: string;
  path: string;
  href: string;
}

const Contact = () => {
  const articles: ContactItem[] = [
    {
      icon: faEnvelope,
      label:
        "Feel free to contact us via email or phone during our business hours.",
      path: "Info@Takatuf .com",
      href: "mailto:info@Takatuf.com",
    },
    {
      icon: faWhatsapp,
      label: "Our team will get back to you as soon as possible.",
      path: "+966 54 104 1901",
      href: "https://wa.me/+966541041901",
    },
  ];
  return (
    <section
      className={`${styles.wrapper} container d-f align-center f-dir-col`}
    >
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>CONTACT US</h1>
        <small className={styles.subTitle}>
          Have a question or need support?{" "}
        </small>
      </div>

      <div className="d-f align-center">
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
      <ul className={`${styles.links} d-f align-center`}>
        <li>
          <a href="https://x.com/">
            <FontAwesomeIcon
              icon={faTwitter}
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
