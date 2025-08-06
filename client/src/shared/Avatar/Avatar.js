import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./Avatar.module.css";
const Avatar = ({ currentUser, onClick }) => {
    const configureAvatarName = () => {
        if (currentUser) {
            return `${currentUser?.firstName
                .charAt(0)
                .toUpperCase()}.${currentUser?.lastName.charAt(0).toUpperCase()}`;
        }
    };
    return (_jsx("div", { className: `${styles.avatar}  pointer d-f align-center justify-center`, onClick: onClick, children: configureAvatarName() }));
};
export default Avatar;
