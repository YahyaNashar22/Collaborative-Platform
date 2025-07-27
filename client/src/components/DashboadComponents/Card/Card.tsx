import { ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = {
  name: string;
  description: string;
  projectDeadline: Date;
  stage: number;
  role?: string;
  requestStatus: string;
  offerDeadline: Date;
  onClick?: () => void;
  children?: ReactNode;
};

const getProjectStatus = (
  projectDeadline: Date
): "onTrack" | "dueSoon" | "upcoming" | "urgent" | "overdue" => {
  const now = new Date();
  const deadline = new Date(projectDeadline);
  const diffInDays = Math.ceil(
    (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays < 0) return "overdue";
  if (diffInDays <= 3) return "urgent";
  if (diffInDays <= 7) return "upcoming";
  if (diffInDays <= 14) return "dueSoon";
  return "onTrack";
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "onTrack":
      return "On Track";
    case "dueSoon":
      return "Due Soon";
    case "upcoming":
      return "Upcoming";
    case "urgent":
      return "Urgent";
    case "overdue":
      return "Overdue";
    default:
      return "";
  }
};

const Card = ({
  name,
  description,
  projectDeadline,
  offerDeadline,
  children,
  requestStatus,
}: CardProps) => {
  const status = getProjectStatus(projectDeadline);
  const statusLabel = getStatusLabel(status);

  const isAccepted = requestStatus.toLowerCase() === "accepted";

  return (
    <div className={styles.card}>
      {isAccepted ? (
        <div className={`${styles.statusBadge} ${styles.accepted}`}>
          Accepted
        </div>
      ) : (
        <div className={`${styles.statusBadge} ${styles[status]}`}>
          {statusLabel}
        </div>
      )}

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
