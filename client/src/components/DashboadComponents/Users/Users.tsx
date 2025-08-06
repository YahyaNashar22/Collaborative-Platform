import { useEffect, useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Users.module.css";
import {
  changeUserBannedStatus,
  getALlUsers,
} from "../../../services/UserServices";
import UsersRawSkeleton from "../../../shared/UsersRawSkeleton/UsersRawSkeleton";
import { toast } from "react-toastify";
import ProfilePage from "../../../pages/ProfilePage/ProfilePage";

type User = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  banned: boolean;
  services: boolean;
  role: string;
};

const Users = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [users, setUsers] = useState<User[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const handleSearch = (userData: string) => {
    setSearchValue(userData);
  };
  const toggleBlockStatus = async (id: string) => {
    const currentUser = users?.find((user) => user._id === id);
    if (!currentUser) return;

    const newBannedStatus = !currentUser.banned;
    setIsLoading(true);
    setUsers((prevUsers) =>
      prevUsers?.map((user) =>
        user._id === id ? { ...user, banned: newBannedStatus } : user
      )
    );

    try {
      await changeUserBannedStatus(id, newBannedStatus);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured!");

      setUsers((prevUsers) =>
        prevUsers?.map((user) =>
          user._id === id ? { ...user, banned: !newBannedStatus } : user
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const result = await getALlUsers();
      setUsers(result);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (users && users.length > 0) return;
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!searchValue.trim()) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeout = setTimeout(() => {
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  const filteredUsers = users?.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleRowClick = (user) => {
    setCurrentUserId(user._id);
  };

  return (
    <>
      {currentUserId ? (
        <ProfilePage userId={currentUserId} isViewer={true} />
      ) : (
        <main className={`${styles.wrapper} w-100`}>
          <div className={styles.header}>
            <TextInput
              placeholder="Search"
              type="text"
              value={searchValue}
              name="search_projects"
              required={false}
              hasIcon={true}
              onChange={(e) => handleSearch(e)}
            />
          </div>

          <div className={styles.content}>
            <table className={`${styles.table} w-100`}>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading || isSearching ? (
                  UsersRawSkeleton(11)
                ) : filteredUsers && filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr
                      key={`${user._id}-${index}`}
                      className="pointer"
                      onClick={() => handleRowClick(user)}
                    >
                      <td>{`${user.firstName} ${user.lastName}`}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <span
                          onClick={() => toggleBlockStatus(user._id)}
                          className={`${styles.status} ${
                            user.banned ? styles.blocked : styles.active
                          }`}
                        >
                          {user.banned ? "Blocked" : "Active"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className={styles.noData}>
                      <div className={styles.noDataContent}>
                        🙁 No users found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      )}
    </>
  );
};

export default Users;
