// @ts-nocheck

import { ReactNode } from "react";
import styles from "./Card.module.css";
import { useTranslation } from "react-i18next";

type CardProps = {
  name: string;
  description: string;
  projectDeadline: Date;
  projectEstimatedDeadline?: Date;
  projectStartDate?: Date;
  // stage: number | string;
  role?: string;
  requestStatus?: string;
  projectStatus?: string;
  offerDeadline?: Date;
  onClick?: () => void;
  children?: ReactNode;
};

const getProjectStatus = (
  projectDeadline: Date,
): "onTrack" | "dueSoon" | "upcoming" | "urgent" | "overdue" => {
  const now = new Date();
  const deadline = new Date(projectDeadline);
  const diffInDays = Math.ceil(
    (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
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
  projectStartDate,
  children,
  projectStatus,
  requestStatus,
  projectEstimatedDeadline,
}: CardProps) => {
  const { t } = useTranslation();

  const status = getProjectStatus(projectDeadline);
  const statusLabel = getStatusLabel(status);

  const isAccepted = requestStatus?.toLowerCase() === "accepted";
  const isCanceled = requestStatus?.toLowerCase() === "canceled";

  const projectAccepted = projectStatus?.toLowerCase() === "completed";
  const projectInProgress = projectStatus?.toLowerCase() === "in_progress";

  return (
    <div className={styles.card}>
      {isAccepted ? (
        <div className={`${styles.statusBadge} ${styles.accepted}`}>
          {t("Accepted")}
        </div>
      ) : isCanceled ? (
        <div className={`${styles.statusBadge} ${styles.canceled}`}>
          {t("Canceled")}
        </div>
      ) : projectAccepted ? (
        <div className={`${styles.statusBadge} ${styles.accepted}`}>
          {t("Completed")}
        </div>
      ) : projectInProgress ? (
        <div className={`${styles.statusBadge} ${styles.upcoming}`}>
          {t("InProgress")}
        </div>
      ) : (
        <div className={`${styles.statusBadge} ${styles[status]}`}>
          {t(statusLabel)}
        </div>
      )}
      <header className={styles.cardHeader}>
        <h3 className={styles.title}>{name || "No Title"}</h3>
      </header>

      <div className={styles.cardBody}>
        <p className="styles.description">{description || "No Description"}</p>

        <div className={styles.deadlineItem}>
          {t("Project Start Date:")} {new Date(projectStartDate).toLocaleDateString()}
        </div>
        <div className={styles.deadlineItem}>
          {t("Project Deadline:")} {new Date(projectDeadline).toLocaleDateString()}
        </div>
        {offerDeadline ? (
          <div className={styles.deadlineItem}>
            {t("Offer Deadline:")} {new Date(offerDeadline).toLocaleDateString()}
          </div>
        ) : (
          <div className={styles.deadlineItem}>
            {t("Estimated Deadline:")}{" "}
            {new Date(projectEstimatedDeadline).toLocaleDateString()}
          </div>
        )}
      </div>

      {children && <footer className={styles.cardFooter}>{children}</footer>}
    </div>
  );
};

export default Card;
