import Profile from "../../components/ProfileComponents/Profile";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  return (
    <div className={`${styles.wrapper} w-100`}>
      <Profile />
    </div>
  );
};

export default ProfilePage;
