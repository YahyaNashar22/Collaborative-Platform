import { jsx as _jsx } from "react/jsx-runtime";
import Users from "../../../components/DashboadComponents/Users/Users";
import styles from "./UsersPage.module.css";
const UsersPage = () => {
    return (_jsx("div", { className: `${styles.wrapper} d-f w-100`, children: _jsx(Users, {}) }));
};
export default UsersPage;
