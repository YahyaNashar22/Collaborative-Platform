import { useEffect, useState } from "react";
import Users from "../../../components/DashboadComponents/Users/Users";
import styles from "./UsersPage.module.css";
import { toast } from "react-toastify";
import { getALlUsers } from "../../../services/UserServices";
import { useTranslation } from "react-i18next";

const UsersPage = ({ currentUsersRole }: { currentUsersRole: string }) => {
  const { t } = useTranslation();

  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const result = await getALlUsers(currentUsersRole);
      setUsers(result);
    } catch (error) {
      toast.error((error as any)?.data?.message || t("Error Occurred!"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentUsersRole]);
  return (
    <div className={`${styles.wrapper} d-f w-100`}>
      <Users isLoading={isLoading} users={users} />
    </div>
  );
};

export default UsersPage;
