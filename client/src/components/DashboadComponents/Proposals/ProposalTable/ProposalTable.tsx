import ProposalRow from "../ProposalRow/ProposalRow";
import { Proposal } from "../../../../interfaces/Proposal";
import styles from "./ProposalTable.module.css";

type ProposalRowProps = {
  data: Proposal[];
  onClick?: () => void;
};

const ProposalTable = ({ data, onClick }: ProposalRowProps) => {
  return (
    <table className={`${styles.table} w-100`}>
      <thead>
        <tr>
          <th className={styles.title}>Proposal</th>
          <th className={styles.title}>Deadline</th>
          <th className={styles.title}>Status</th>
          <th className={styles.title}>Price</th>
          <th className={styles.title}>Confirmation</th>
        </tr>
      </thead>
      <tbody>
        {data.map((proposal, idx) => (
          <ProposalRow
            key={proposal.id ?? idx}
            image={proposal.image}
            title={proposal.title}
            description={proposal.description}
            deadline={proposal.deadline}
            status={proposal.status}
            price={proposal.price}
            isConfirmed={proposal.isConfirmed}
            onClick={onClick}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProposalTable;
