import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProposalRow.module.css";
import {
  faCheckDouble,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

type ProposalRowProps = {
  id: string;
  image: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
  price: string;
  isConfirmed: boolean;
  onRowClick: (id: string) => void;
  onConfirmationClick: (id: string) => void;
};

const ProposalRow = ({
  id,
  image,
  title,
  description,
  deadline,
  status,
  price,
  isConfirmed,
  onRowClick,
  onConfirmationClick,
}: ProposalRowProps) => {
  const renderConfirmationIcon = () => {
    if (isConfirmed) {
      return (
        <FontAwesomeIcon
          icon={faCircleCheck}
          style={{ color: "#44aa55" }}
          size="lg"
        />
      );
    }

    if (status === "submitted") {
      return (
        <FontAwesomeIcon
          icon={faCheckDouble}
          style={{ color: "#707070" }}
          size="lg"
        />
      );
    }

    if (status === "Pending") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="none"
          stroke="#666"
          strokeWidth="24"
          width="20"
          height="20"
        >
          <circle cx="256" cy="256" r="208" />
        </svg>
      );
    }

    return (
      <FontAwesomeIcon
        icon={faCircleXmark}
        style={{ color: "#c52c2c" }}
        size="lg"
      />
    );
  };

  const handleConfirmationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConfirmationClick?.(id);
  };

  return (
    <tr onClick={() => onRowClick?.(id)} className={`${styles.row} pointer`}>
      <td>
        <div className={`${styles.left} d-f align-center`}>
          <div className={styles.imageContainer}>
            <img src={image} alt="proposal" />
          </div>
          <div className={`${styles.proposalInfo} d-f f-dir-col`}>
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
        </div>
      </td>
      <td>{deadline}</td>
      <td>{status}</td>
      <td>{price}</td>
      <td onClick={handleConfirmationClick}>{renderConfirmationIcon()}</td>
    </tr>
  );
};

export default ProposalRow;
