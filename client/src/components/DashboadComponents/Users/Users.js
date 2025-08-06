import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Users.module.css";
import { changeUserBannedStatus, getALlUsers, } from "../../../services/UserServices";
import UsersRawSkeleton from "../../../shared/UsersRawSkeleton/UsersRawSkeleton";
import { toast } from "react-toastify";
import ProfilePage from "../../../pages/ProfilePage/ProfilePage";
const Users = () => {
    const [searchValue, setSearchValue] = useState("");
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const handleSearch = (userData) => {
        setSearchValue(userData);
    };
    const toggleBlockStatus = async (id) => {
        const currentUser = users?.find((user) => user._id === id);
        if (!currentUser)
            return;
        const newBannedStatus = !currentUser.banned;
        setIsLoading(true);
        setUsers((prevUsers) => prevUsers?.map((user) => user._id === id ? { ...user, banned: newBannedStatus } : user));
        try {
            await changeUserBannedStatus(id, newBannedStatus);
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
            setUsers((prevUsers) => prevUsers?.map((user) => user._id === id ? { ...user, banned: !newBannedStatus } : user));
        }
        finally {
            setIsLoading(false);
        }
    };
    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const result = await getALlUsers();
            setUsers(result);
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (users && users.length > 0)
            return;
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
    const filteredUsers = users?.filter((user) => user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase()));
    const handleRowClick = (user) => {
        setCurrentUserId(user._id);
    };
    return (_jsx(_Fragment, { children: currentUserId ? (_jsx(ProfilePage, { userId: currentUserId, isViewer: true })) : (_jsxs("main", { className: `${styles.wrapper} w-100`, children: [_jsx("div", { className: styles.header, children: _jsx(TextInput, { placeholder: "Search", type: "text", value: searchValue, name: "search_projects", required: false, hasIcon: true, onChange: (e) => handleSearch(e) }) }), _jsx("div", { className: styles.content, children: _jsxs("table", { className: `${styles.table} w-100`, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Full Name" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "Phone Number" }), _jsx("th", { children: "Status" })] }) }), _jsx("tbody", { children: isLoading || isSearching ? (UsersRawSkeleton(11)) : filteredUsers && filteredUsers.length > 0 ? (filteredUsers.map((user, index) => (_jsxs("tr", { className: "pointer", onClick: () => handleRowClick(user), children: [_jsx("td", { children: `${user.firstName} ${user.lastName}` }), _jsx("td", { children: user.email }), _jsx("td", { children: user.phone }), _jsx("td", { children: _jsx("span", { onClick: () => toggleBlockStatus(user._id), className: `${styles.status} ${user.banned ? styles.blocked : styles.active}`, children: user.banned ? "Blocked" : "Active" }) })] }, `${user._id}-${index}`)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 3, className: styles.noData, children: _jsx("div", { className: styles.noDataContent, children: "\uD83D\uDE41 No users found" }) }) })) })] }) })] })) }));
};
export default Users;
