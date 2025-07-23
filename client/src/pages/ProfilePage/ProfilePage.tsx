import { useEffect, useState } from "react";
import Profile from "../../components/ProfileComponents/Profile";
import styles from "./ProfilePage.module.css";
import { getUserData } from "../../services/UserServices";
import { UserProfileData } from "../../interfaces/User";

interface profileType {
  userId: string;
}

const ProfilePage = ({ userId }: profileType) => {
  const [userData, setUserData] = useState<UserProfileData>();
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
      {userData && <Profile userData={userData} />}
    </div>
  );
};

export default ProfilePage;
