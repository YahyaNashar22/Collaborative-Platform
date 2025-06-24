import styles from "./Contact.module.css";
import map from "../../../../assets/images/map.png";
import ContactForm from "../ContactForm/ContactForm";

const Contact = () => {
  return (
    <div className={`${styles.wrapper} d-f `}>
      <div className={styles.left}>
        <img src={map} alt="map" width={500} height={665} />
      </div>
      <div className="w-100">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
