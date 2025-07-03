import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProposalRow.module.css";
import {
  faCheckDouble,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

type ProposalRowProps = {
  image: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
  price: string;
  isConfirmed: boolean;
  onClick?: () => void;
};

const ProposalRow = ({
  image,
  title,
  description,
  deadline,
  status,
  price,
  isConfirmed,
  onClick,
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

    return (
      <FontAwesomeIcon
        icon={faCircleXmark}
        style={{ color: "#c52c2c" }}
        size="lg"
      />
    );
  };
  return (
    <tr onClick={onClick} className={`${styles.row} pointer`}>
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
      <td>{renderConfirmationIcon()}</td>
    </tr>
  );
};

export default ProposalRow;
