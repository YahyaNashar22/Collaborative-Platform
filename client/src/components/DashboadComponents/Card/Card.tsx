import styles from "./Card.module.css";

type CardProps = {
  title: string;
  description: string;
  deadline: string;
  offerDeadline: string;
  onClick?: () => void;
};

const Card = ({
  title,
  description,
  deadline,
  offerDeadline,
  onClick,
}: CardProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <header className={styles.cardHeader}>
        <h3 className={styles.title}>{title}</h3>
      </header>
      <div className={styles.cardBody}>{description}</div>
      <footer className={styles.cardFooter}>
        <span className={styles.deadlineItem}>Deadline: {deadline}</span>
        {/* <span className={styles.deadlineItem}>
          Offer Deadline: {offerDeadline}
        </span> */}
      </footer>
    </div>
  );
};

export default Card;
