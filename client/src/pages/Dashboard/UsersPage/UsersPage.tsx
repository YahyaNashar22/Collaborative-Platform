import Users from "../../../components/DashboadComponents/Users/Users";
import styles from "./UsersPage.module.css";

const UsersPage = () => {
  return (
    <div className={`${styles.wrapper} d-f w-100`}>
      <Users />
    </div>
  );
};

export default UsersPage;
