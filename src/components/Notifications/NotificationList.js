import { Link } from "react-router-dom";
import { useNotifications } from "../../context/NotificationsContext";
import Avatar from "../Avatar/Avatar";
import styles from "./Notifications.module.css";

const typeIcons = {
  like: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  comment: <path d="M4 5h16v11H8l-4 4z" />,
  friend: (
    <>
      <circle cx="10" cy="8" r="4" />
      <path d="M3 21a7 7 0 0 1 14 0M19 8v6M16 11h6" />
    </>
  ),
  event: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  group: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
};

const TypeIcon = ({ type, large = false }) => (
  <span className={`${styles.typeIcon} ${styles[type]} ${large ? styles.typeIconLarge : ""}`}>
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {typeIcons[type]}
    </svg>
  </span>
);

// onNavigate lets the dropdown close itself after a click
const NotificationList = ({ items, onNavigate }) => {
  const { markRead } = useNotifications();

  return (
    <ul className={styles.list} aria-label="Список уведомлений">
      {items.map(({ id, type, actor, text, time, link, read }) => (
        <li key={id}>
          <Link
            to={link}
            className={`${styles.item} ${read ? "" : styles.unread}`}
            onClick={() => {
              markRead(id);
              onNavigate?.();
            }}
          >
            <span className={styles.visual}>
              {actor ? (
                <>
                  <Avatar name={actor} size={44} />
                  <TypeIcon type={type} />
                </>
              ) : (
                <TypeIcon type={type} large />
              )}
            </span>
            <span className={styles.content}>
              <span className={styles.text}>
                {actor && <strong>{actor}</strong>}
                {actor ? ": " : ""}
                {text}
              </span>
              <span className={styles.time}>{time}</span>
            </span>
            {!read && <span className={styles.dot} aria-label="Не прочитано" />}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NotificationList;
