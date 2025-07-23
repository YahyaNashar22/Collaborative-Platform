import { ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = {
  name: string;
  description: string;
  projectDeadline: Date;
  stage: number;
  role: string | undefined;
  offerDeadline: Date;
  onClick?: () => void;
  children?: ReactNode;
};

const Card = ({
  name,
  description,
  projectDeadline,
  offerDeadline,
  children,
}: CardProps) => {
  return (
    <div className={styles.card}>
      <header className={styles.cardHeader}>
        <h3 className={styles.title}>{name}</h3>
      </header>

      <div className={styles.cardBody}>
        <p className={styles.description}>{description}</p>

        <div className={styles.deadlineItem}>
          Project Deadline: {new Date(projectDeadline).toLocaleDateString()}
        </div>
        <div className={styles.deadlineItem}>
          Offer Deadline: {new Date(offerDeadline).toLocaleDateString()}
        </div>
      </div>

      {children && <footer className={styles.cardFooter}>{children}</footer>}
    </div>
  );
};

export default Card;
