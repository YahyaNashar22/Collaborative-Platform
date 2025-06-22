import Contact from "../../components/ContactComponents/Contact/Contact";
import styles from "./ContactPage.module.css";

const ContactPage = () => {
  return (
    <div
      className={`${styles.wrapper} container d-f f-dir-col justify-between`}
    >
      <Contact />
    </div>
  );
};

export default ContactPage;
