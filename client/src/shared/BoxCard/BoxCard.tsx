import styles from "./BoxCard.module.css";

type BoxCardProps = {
  image: string;
  alt: string;
  title: string;
  status?: string;
  providerName?: string;
  duration?: string;
  size?: string;
};

const BoxCard = ({
  image,
  alt,
  title,
  status = "OPEN",
  providerName = "Provider name",
  duration,
  size,
}: BoxCardProps) => {
  return (
    <div className={`${styles.box} ${styles[size ?? "default"]}`}>
      <img
        src={image}
        width={size === "small" ? 300 : 350}
        height={size === "small" ? 300 : 350}
        className={styles.cardImg}
        alt={alt}
      />
      <div className={styles.subBox}>
        <div className={styles.status}>{status}</div>
        <h1 className={styles.boxTitle}>{title}</h1>
        <div className={styles.subTitle}>{providerName}</div>
        <p className="purple intense">{duration}</p>
      </div>
    </div>
  );
};

export default BoxCard;
