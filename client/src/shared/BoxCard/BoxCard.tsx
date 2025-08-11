import styles from "./BoxCard.module.css";

type BoxCardProps = {
  image: string;
  alt: string;
  title: string;
  createdAt?: string;
  status: string;
  description?: string;
  duration?: string;
  size?: "small" | "default";
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const BoxCard = ({
  image,
  alt,
  title,
  createdAt = "",
  description = "Description",
  duration,
  status,
  size = "default",
}: BoxCardProps) => {
  const formattedDate = createdAt ? formatDate(createdAt) : "N/A";

  return (
    <div className={`${styles.box} ${styles[size]}`}>
      <img
        src={image}
        width={size === "small" ? 300 : 350}
        height={size === "small" ? 300 : 350}
        className={styles.cardImg}
        alt={alt}
      />
      <div className={styles.subBox}>
        <div className={`${styles.createdAt} d-f justify-between`}>
          <div>{formattedDate}</div>
          <div
            className={`${styles.status} ${
              status === "accepted" ? styles.accepted : ""
            }`}
          >
            {status === "accepted" ? "Completed" : "Pending"}
          </div>
        </div>
        <h1 className={styles.boxTitle}>{title}</h1>
        <div className={styles.subTitle}>{description}</div>
        <p className="purple intense">{duration}</p>
      </div>
    </div>
  );
};

export default BoxCard;
