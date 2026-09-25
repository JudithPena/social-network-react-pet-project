import { Route, Routes } from "react-router-dom";
import { useNotifications } from "../../context/NotificationsContext";
import Tabs from "../Tabs/Tabs";
import NotificationList from "./NotificationList";
import styles from "./Notifications.module.css";

const NotificationsTab = ({ onlyUnread = false }) => {
  const { notifications } = useNotifications();
  const items = onlyUnread ? notifications.filter((item) => !item.read) : notifications;

  if (items.length === 0) {
    return <p className={styles.empty}>{onlyUnread ? "Все уведомления прочитаны 🎉" : "Уведомлений пока нет."}</p>;
  }

  return (
    <section className={styles.card}>
      <NotificationList items={items} />
    </section>
  );
};

const Notifications = () => {
  const { notifications, unreadCount, markAllRead } = useNotifications();

  const tabs = [
    { path: "/notifications", label: "Все", count: notifications.length },
    { path: "/notifications/unread", label: "Непрочитанные", count: unreadCount },
  ];

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>Уведомления</h1>
          {unreadCount > 0 && (
            <button type="button" className={styles.textButton} onClick={markAllRead}>
              Отметить все как прочитанные
            </button>
          )}
        </div>
        <Tabs items={tabs} label="Разделы уведомлений" />
      </section>

      <Routes>
        <Route index element={<NotificationsTab />} />
        <Route path="unread" element={<NotificationsTab onlyUnread />} />
      </Routes>
    </div>
  );
};

export default Notifications;
