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
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "../../translation/langStore";

const NotificationBell = () => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();

  const isArabic = language === "ar";

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

  // Mark a notification as read
  const markAsRead = async (id: string) => {
    try {
      await axiosInstance.delete("/notifications/" + id);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await axiosInstance.delete("/notifications/all/" + user?._id);
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true })),
      );
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
        {notifications.some((notification) => !notification.read) && (
          <span className={styles.badge}>
            {notifications.filter((notification) => !notification.read).length}
          </span>
        )}
      </div>

      {isOpen && (
        <div
          className={styles.dropdown}
          style={{
            ...(isArabic ? { left: 0 } : { right: 0 }),
          }}
        >
          <div className={styles.header}>
            <h4 className={styles.title}>{t("Notifications")}</h4>
            {notifications.some((notification) => !notification.read) && (
              <FontAwesomeIcon
                icon={faCheckDouble}
                className={styles.markAllIcon}
                title={t("Mark all as read")}
                onClick={markAllAsRead}
              />
            )}
          </div>

          {loading ? (
            <div className={styles.loading}>{t("Loading...")}</div>
          ) : notifications.length === 0 ? (
            <p className={styles.empty}>
              {t("No new notifications, refresh page to check for updates")}
            </p>
          ) : (
            <ul className={styles.list}>
              {notifications.map((n) => (
                <li
                  key={n._id}
                  className={styles.notificationItem}
                  style={{ opacity: n.read ? 0.6 : 1 }}
                >
                  <span className={styles.NotificationText}>{n.text}</span>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={styles.readIcon}
                    onClick={() => markAsRead(n._id)}
                    title={t("Mark as read")}
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
