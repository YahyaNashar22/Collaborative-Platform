import { ReactNode } from "react";
import LibButton from "../../../libs/common/lib-button/LibButton";
import styles from "./Card.module.css";

type CardProps = {
  name: string;
  description: string;
  projectDeadline: Date;
  stage: number;
  offerDeadline: Date;
  onClick?: () => void;
  children?: ReactNode;
};

const Card = ({
  name,
  description,
  projectDeadline,
  offerDeadline,
  stage,
  onClick,
  children,
}: CardProps) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  const renderContent = () => {
    switch (stage) {
      case 1:
        return <p className={styles.statusMessage}>⏳ Awaiting For Offers.</p>;
      case 2:
        return (
          <>
            <p className={styles.statusMessage}>
              📬 Providers have sent proposals. Click below to view them.
            </p>
            <LibButton
              label="View Proposals"
              onSubmit={handleClick}
              bold={true}
            />
          </>
        );
      default:
        return (
          <p className={styles.statusMessage}>
            ⚠️ Unknown stage. Please check with support.
          </p>
        );
    }
  };

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

        <div className={styles.cardContent}>{renderContent()}</div>
      </div>

      {children && <footer className={styles.cardFooter}>{children}</footer>}
    </div>
  );
};

export default Card;
