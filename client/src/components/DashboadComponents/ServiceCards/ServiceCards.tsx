import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./ServiceCards.module.css";
import { useTranslation } from "react-i18next";

interface ServiceCardData {
  _id: string;
  name: string;
  description: string;
}

interface ServiceCardsProps {
  data: ServiceCardData[];
  onDelete: (_id: string) => void;
}

const ServiceCards = ({ data, onDelete }: ServiceCardsProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.compactCardsContainer}>
      {data.length === 0 ? (
        <div className={styles.emptyState}>{t("No services available")}.</div>
      ) : (
        data.map(({ _id, name, description }) => (
          <div
            key={_id}
            className={`${styles.compactCard} d-f justify-between`}
          >
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>{name}</p>
              <p className={styles.cardDesc}>{description}</p>
            </div>

            <button
              className={`${styles.trashButton} pointer`}
              onClick={() => onDelete(_id)}
              aria-label="Delete service"
            >
              <FontAwesomeIcon className={styles.trash} icon={faTrash} />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ServiceCards;
