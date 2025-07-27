import { useEffect, useState } from "react";
import Profile from "../../components/ProfileComponents/Profile";
import styles from "./ProfilePage.module.css";
import { getUserData } from "../../services/UserServices";

interface profileType {
  userId: string;
}

const ProfilePage = ({ userId }: profileType) => {
  const [userData, setUserData] = useState<{ [key: string]: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getCurrentUser = async () => {
    setIsLoading(true);
    try {
      if (userId) {
        const response = await getUserData(userId);
        if (response)
          setUserData({
            _id: response._id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            phone: response.phone,
            profilePicture: response.profilePicture,
            services: response.services,
            role: response.role,
          });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [userId]);

  return (
    <div className={`${styles.wrapper} w-100`}>
      {isLoading ? (
        <span className="loader"></span>
      ) : (
        userData && <Profile userData={userData} />
      )}
    </div>
  );
};

export default ProfilePage;
