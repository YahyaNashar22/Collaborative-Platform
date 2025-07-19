import { useEffect, useState } from "react";
import Profile from "../../components/ProfileComponents/Profile";
import styles from "./ProfilePage.module.css";
import { getUserData } from "../../services/UserServices";

interface profileType {
  userId: string;
}

const ProfilePage = ({ userId }: profileType) => {
  const [userData, setUserData] = useState();
  const getCurrentUser = async () => {
    try {
      if (userId) {
        const response = await getUserData(userId);
        if (response) setUserData(response);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [userId]);

  return (
    <div className={`${styles.wrapper} w-100`}>
      <Profile userData={userData} />
    </div>
  );
};

export default ProfilePage;
