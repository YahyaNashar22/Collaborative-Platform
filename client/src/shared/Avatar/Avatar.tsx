import styles from "./Avatar.module.css";

const Avatar = ({ currentUser, onClick }) => {
  const configureAvatarName = () => {
    if (currentUser) {
      return `${currentUser.firstName
        .charAt(0)
        .toUpperCase()}.${currentUser.lastName.charAt(0).toUpperCase()}`;
    }
  };
  return (
    <div
      className={`${styles.avatar}  pointer d-f align-center justify-center`}
      onClick={onClick}
    >
      {configureAvatarName()}
    </div>
  );
};

export default Avatar;
