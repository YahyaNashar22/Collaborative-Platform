import { useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Users.module.css";

type User = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  isBlocked: boolean;
};

const Users = () => {
  const usersData: User[] = [
    {
      id: "1",
      username: "jdoe",
      fullName: "John Doe",
      email: "jdoe@mail.co",
      isBlocked: false,
    },
    {
      id: "2",
      username: "asmith",
      fullName: "Alice Smith",
      email: "asmith@mail.co",
      isBlocked: true,
    },
    {
      id: "3",
      username: "bmiller",
      fullName: "Bob Miller",
      email: "bmiller@mail.co",
      isBlocked: false,
    },
    {
      id: "4",
      username: "kpatel",
      fullName: "Kiran Patel",
      email: "kpatel@mail.co",
      isBlocked: true,
    },
    {
      id: "5",
      username: "lgreen",
      fullName: "Laura Green",
      email: "lgreen@mail.co",
      isBlocked: false,
    },
    {
      id: "6",
      username: "dnguyen",
      fullName: "Duy Nguyen",
      email: "dnguyen@mail.co",
      isBlocked: false,
    },
    {
      id: "7",
      username: "swhite",
      fullName: "Sarah White",
      email: "swhite@mail.co",
      isBlocked: true,
    },
    {
      id: "8",
      username: "mrodriguez",
      fullName: "Miguel Rodriguez",
      email: "mrodriguez@mail.co",
      isBlocked: false,
    },
    {
      id: "9",
      username: "zlee",
      fullName: "Zara Lee",
      email: "zlee@mail.co",
      isBlocked: true,
    },
    {
      id: "10",
      username: "ahassan",
      fullName: "Ali Hassan",
      email: "ahassan@mail.co",
      isBlocked: false,
    },
    {
      id: "1",
      username: "jdoe",
      fullName: "John Doe",
      email: "jdoe@mail.co",
      isBlocked: false,
    },
    {
      id: "2",
      username: "asmith",
      fullName: "Alice Smith",
      email: "asmith@mail.co",
      isBlocked: true,
    },
    {
      id: "3",
      username: "bmiller",
      fullName: "Bob Miller",
      email: "bmiller@mail.co",
      isBlocked: false,
    },
    {
      id: "4",
      username: "kpatel",
      fullName: "Kiran Patel",
      email: "kpatel@mail.co",
      isBlocked: true,
    },
    {
      id: "5",
      username: "lgreen",
      fullName: "Laura Green",
      email: "lgreen@mail.co",
      isBlocked: false,
    },
    {
      id: "6",
      username: "dnguyen",
      fullName: "Duy Nguyen",
      email: "dnguyen@mail.co",
      isBlocked: false,
    },
    {
      id: "7",
      username: "swhite",
      fullName: "Sarah White",
      email: "swhite@mail.co",
      isBlocked: true,
    },
    {
      id: "8",
      username: "mrodriguez",
      fullName: "Miguel Rodriguez",
      email: "mrodriguez@mail.co",
      isBlocked: false,
    },
    {
      id: "9",
      username: "zlee",
      fullName: "Zara Lee",
      email: "zlee@mail.co",
      isBlocked: true,
    },
    {
      id: "10",
      username: "ahassan",
      fullName: "Ali Hassan",
      email: "ahassan@mail.co",
      isBlocked: false,
    },
    {
      id: "1",
      username: "jdoe",
      fullName: "John Doe",
      email: "jdoe@mail.co",
      isBlocked: false,
    },
    {
      id: "2",
      username: "asmith",
      fullName: "Alice Smith",
      email: "asmith@mail.co",
      isBlocked: true,
    },
    {
      id: "3",
      username: "bmiller",
      fullName: "Bob Miller",
      email: "bmiller@mail.co",
      isBlocked: false,
    },
    {
      id: "4",
      username: "kpatel",
      fullName: "Kiran Patel",
      email: "kpatel@mail.co",
      isBlocked: true,
    },
    {
      id: "5",
      username: "lgreen",
      fullName: "Laura Green",
      email: "lgreen@mail.co",
      isBlocked: false,
    },
    {
      id: "6",
      username: "dnguyen",
      fullName: "Duy Nguyen",
      email: "dnguyen@mail.co",
      isBlocked: false,
    },
    {
      id: "7",
      username: "swhite",
      fullName: "Sarah White",
      email: "swhite@mail.co",
      isBlocked: true,
    },
    {
      id: "8",
      username: "mrodriguez",
      fullName: "Miguel Rodriguez",
      email: "mrodriguez@mail.co",
      isBlocked: false,
    },
    {
      id: "9",
      username: "zlee",
      fullName: "Zara Lee",
      email: "zlee@mail.co",
      isBlocked: true,
    },
    {
      id: "10",
      username: "ahassan",
      fullName: "Ali Hassan",
      email: "ahassan@mail.co",
      isBlocked: false,
    },
    {
      id: "1",
      username: "jdoe",
      fullName: "John Doe",
      email: "jdoe@mail.co",
      isBlocked: false,
    },
    {
      id: "2",
      username: "asmith",
      fullName: "Alice Smith",
      email: "asmith@mail.co",
      isBlocked: true,
    },
    {
      id: "3",
      username: "bmiller",
      fullName: "Bob Miller",
      email: "bmiller@mail.co",
      isBlocked: false,
    },
    {
      id: "4",
      username: "kpatel",
      fullName: "Kiran Patel",
      email: "kpatel@mail.co",
      isBlocked: true,
    },
    {
      id: "5",
      username: "lgreen",
      fullName: "Laura Green",
      email: "lgreen@mail.co",
      isBlocked: false,
    },
    {
      id: "6",
      username: "dnguyen",
      fullName: "Duy Nguyen",
      email: "dnguyen@mail.co",
      isBlocked: false,
    },
    {
      id: "7",
      username: "swhite",
      fullName: "Sarah White",
      email: "swhite@mail.co",
      isBlocked: true,
    },
    {
      id: "8",
      username: "mrodriguez",
      fullName: "Miguel Rodriguez",
      email: "mrodriguez@mail.co",
      isBlocked: false,
    },
    {
      id: "9",
      username: "zlee",
      fullName: "Zara Lee",
      email: "zlee@mail.co",
      isBlocked: true,
    },
    {
      id: "10",
      username: "ahassan",
      fullName: "Ali Hassan",
      email: "ahassan@mail.co",
      isBlocked: false,
    },
  ];
  const [searchValue, setSearchValue] = useState<string>("");
  const [users, setUsers] = useState<User[]>(usersData);

  const handleSearch = (userData: string) => {
    setSearchValue(userData);
  };

  const toggleBlockStatus = (id: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };

  return (
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
              <th>ID</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) =>
                user.username.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((user, index) => (
                <tr key={`${user.id}-${index}`} className="pointer">
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      onClick={() => toggleBlockStatus(user.id)}
                      className={`${styles.status} ${
                        user.isBlocked ? styles.blocked : styles.active
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Users;
