import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProposalRow.module.css";
import { faCircleCheck, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering row click
    setIsExpanded((prev) => !prev);
  };
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

    if (status === "Pending") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="none"
          stroke="#666"
          strokeWidth="24"
          width="24"
          height="20"
        >
          <circle cx="256" cy="256" r="208" />
        </svg>
      );
    }
  };

  const handleConfirmationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConfirmationClick?.(id);
  };

  return (
    <tr onClick={() => onRowClick?.(id)} className={`${styles.row} pointer`}>
      <td>
        <div className={`${styles.left} d-f align-center`}>
          <div className={`${styles.proposalInfo} d-f f-dir-col`}>
            <h4 title={title}>{title}</h4>
            <p
              title={description}
              onClick={toggleDescription}
              className={!isExpanded ? styles.ellipsis : styles.expanded}
            >
              {description}
            </p>
            <span
              onClick={toggleDescription}
              className={`${styles.toggleText} bold`}
            >
              {isExpanded ? "Show less" : "Show more"}
            </span>
          </div>
        </div>
      </td>

      <td title={deadline}>{deadline}</td>
      <td title={status}>
        <span
          className={`${styles.status} ${
            styles[status.replace(/\s+/g, "").toLowerCase()]
          }`}
        >
          <span className={styles.dot}></span>
          {status}
        </span>
      </td>
      <td title={price}>{price}</td>
      <td>
        <div className="d-f">
          <div onClick={handleConfirmationClick}>
            {renderConfirmationIcon()}
          </div>
          <div onClick={() => console.log("download")}>
            <FontAwesomeIcon
              icon={faDownload}
              size="lg"
              style={{ color: "#6550b4" }}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ProposalRow;
