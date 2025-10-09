import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCheck,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./NotificationBell.module.css";
import { INotification } from "../../interfaces/INotification";
import axiosInstance from "../../Config/axiosInstence";
import { useAuth } from "../../hooks/useAuth";

const NotificationBell = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?._id) return;
      setLoading(true);
      try {
        const res = await axiosInstance.post("/notifications", {
          userId: user._id,
        });
        setNotifications(res.data.payload || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mark a notification as read (removes from list)
  const markAsRead = async (id: string) => {
    try {
      await axiosInstance.delete("/notifications/" + id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await axiosInstance.delete("/notifications/all/" + user?._id);
      setNotifications([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper} ref={bellRef}>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon
          icon={faBell}
          className={styles.bell}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        {notifications.length > 0 && (
          <span className={styles.badge}>{notifications.length}</span>
        )}
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <h4 className={styles.title}>Notifications</h4>
            {notifications.length > 0 && (
              <FontAwesomeIcon
                icon={faCheckDouble}
                className={styles.markAllIcon}
                title="Mark all as read"
                onClick={markAllAsRead}
              />
            )}
          </div>

          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : notifications.length === 0 ? (
            <p className={styles.empty}>No new notifications, refresh page to check for updates</p>
          ) : (
            <ul className={styles.list}>
              {notifications.map((n) => (
                <li key={n._id} className={styles.notificationItem}>
                  <span className={styles.text}>{n.text}</span>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={styles.readIcon}
                    onClick={() => markAsRead(n._id)}
                    title="Mark as read"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
