import Proposals from "../../../components/DashboadComponents/Proposals/Proposals";
import styles from "./ProposalsPage.module.css";

const ProposalsPage = () => {
  return (
    <div className={`${styles.wrapper} d-f w-100`}>
      <Proposals />
    </div>
  );
};

export default ProposalsPage;
