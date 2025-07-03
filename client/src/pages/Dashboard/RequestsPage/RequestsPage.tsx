import Requests from "../../../components/DashboadComponents/Requests/Requests";
import styles from "./RequestsPage.module.css";

const RequestsPage = () => {
  return (
    <div className={`${styles.wrapper} d-f w-100`}>
      <Requests />
    </div>
  );
};

export default RequestsPage;
