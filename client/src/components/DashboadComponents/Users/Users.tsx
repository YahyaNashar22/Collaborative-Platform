import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Users.module.css";
import {
  changeUserBannedStatus,
  sendEmail,
} from "../../../services/UserServices";
import UsersRawSkeleton from "../../../shared/UsersRawSkeleton/UsersRawSkeleton";
import { toast } from "react-toastify";
import ProfilePage from "../../../pages/ProfilePage/ProfilePage";
import LibButton from "../../../libs/common/lib-button/LibButton";
import Window from "../../../libs/common/lib-window/Window";
import TextAreaInput from "../../../libs/common/lib-textArea/TextAreaInput";
import { useUserContext } from "../../../context/UserContext";

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

const Users = ({
  isLoading: loading,
  users: initialUsers,
}: {
  isLoading: boolean;
  users: User[];
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [sendEmailLoading, setSendEmailLoading] = useState<boolean>(false);
  const { currentUserId, setCurrentUserId } = useUserContext();
  const [sendEmailWindow, setSendEmailWindow] = useState<string | null>(null);
  const [emailData, setEmailData] = useState<{
    receiverEmail: string;
    title: string;
    description: string;
  }>({ receiverEmail: "", title: "", description: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUserId(null);
    setUsers(initialUsers);
  }, [initialUsers]);

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
      toast.error((error as any)?.response?.data?.message || "Error Occured!");

      setUsers((prevUsers) =>
        prevUsers?.map((user) =>
          user._id === id ? { ...user, banned: !newBannedStatus } : user
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleRowClick = (user: User) => {
    setCurrentUserId(user._id);
  };

  function splitLongText(str: string, size = 30000) {
    const parts = [];
    for (let i = 0; i < str.length; i += size) {
      parts.push(str.slice(i, i + size));
    }
    return parts;
  }

  const exportToExcel = () => {
    const safeData = users?.map((row) => {
      const newRow: any = {};
      for (const [key, value] of Object.entries(row)) {
        if (typeof value === "string" && value.length > 32767) {
          const parts = splitLongText(value);
          parts.forEach((part, i) => {
            newRow[`${key}_${i + 1}`] = part;
          });
        } else {
          newRow[key] = value;
        }
      }
      return newRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(safeData || []);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${"users"}.xlsx`);
  };

  const handleSendEmail = async () => {
    setSendEmailLoading(true);
    if (emailData.title.trim() === "" || emailData.description.trim() === "") {
      setError("This field is required.");
      return;
    }

    try {
      const response = await sendEmail({
        receiverEmail: emailData.receiverEmail,
        title: emailData.title,
        description: emailData.description,
      });
      if (response.success) {
        toast.success("Email sent successfully!");
        setError("");
        setSendEmailWindow(null);
      }
    } catch (error) {
      toast.error((error as any)?.response?.data?.message || "Error Occured!");
    } finally {
      setSendEmailLoading(false);
    }
  };
  return (
    <>
      {currentUserId ? (
        <ProfilePage userId={currentUserId} isViewer={true} />
      ) : (
        <main className={`${styles.wrapper} w-100`}>
          <div className={`${styles.header} d-f justify-between`}>
            <TextInput
              placeholder="Search"
              type="text"
              value={searchValue}
              name="search_projects"
              required={false}
              hasIcon={true}
              onChange={(e) => handleSearch(e)}
            />
            <LibButton
              label="Export to Excel"
              onSubmit={exportToExcel}
              bold={true}
              padding="0 10px"
              outlined
              color="var(--deep-purple)"
              hoverColor="#8563c326"
              disabled={isLoading}
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
                  <th>Send Email</th>
                </tr>
              </thead>
              <tbody>
                {isLoading || isSearching || loading ? (
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
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBlockStatus(user._id);
                          }}
                          className={`${styles.status} ${
                            user.banned ? styles.blocked : styles.active
                          }`}
                        >
                          {user.banned ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setEmailData({
                              receiverEmail: user.email,
                              title: "",
                              description: "",
                            });
                            setSendEmailWindow(user._id);
                          }}
                          className={`${styles.sendEmailBtn}`}
                        >
                          Send
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
      <Window
        title="Send Email"
        visible={sendEmailWindow !== null}
        onClose={() => setSendEmailWindow(null)}
      >
        <div className="d-f f-dir-col gap-1">
          <TextInput
            name="title"
            label="Title"
            type="text"
            placeholder="Enter a title for the email"
            value={emailData.title}
            required={true}
            onChange={(value: string) =>
              setEmailData((prev) => ({ ...prev, title: value }))
            }
            errorMessage={error as string}
          />
          <TextAreaInput
            name="description"
            label="Description"
            placeholder="Enter description"
            value={emailData.description}
            required={true}
            onChange={(value: string) =>
              setEmailData((prev) => ({ ...prev, description: value }))
            }
          />

          <div className="d-f align-center justify-between mt-1">
            <LibButton
              label="Cancel"
              onSubmit={() => {
                setError("");
                setSendEmailWindow(null);
              }}
              bold={true}
              padding="0"
              outlined
              color="var(--deep-purple)"
              hoverColor="#8563c326"
            />
            <LibButton
              label="Send Request"
              onSubmit={handleSendEmail}
              bold={true}
              backgroundColor="#825beb"
              hoverColor="#6c46d9"
              disabled={sendEmailLoading}
            />
          </div>
        </div>
      </Window>
    </>
  );
};

export default Users;
