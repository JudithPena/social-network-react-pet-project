import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNotifications } from "../../context/NotificationsContext";
import NotificationList from "./NotificationList";
import styles from "./Notifications.module.css";

const PREVIEW_SIZE = 5;

// Bell button with a dropdown; button and badge classes come from the header
const NotificationsMenu = ({ icon, buttonClassName, badgeClassName }) => {
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const { pathname } = useLocation();

  // Close on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on a click outside and on Escape
  useEffect(() => {
    if (!open) return undefined;

    const handleClick = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className={styles.menu} ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className={buttonClassName}
        aria-label="Уведомления"
        aria-expanded={open}
        aria-controls="notifications-panel"
        onClick={() => setOpen((value) => !value)}
      >
        {icon}
        {unreadCount > 0 && <span className={badgeClassName}>{unreadCount}</span>}
      </button>

      {open && (
        <section id="notifications-panel" className={styles.panel} aria-label="Панель уведомлений">
          <header className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Уведомления</h2>
            {unreadCount > 0 && (
              <button type="button" className={styles.textButton} onClick={markAllRead}>
                Прочитать все
              </button>
            )}
          </header>

          <NotificationList items={notifications.slice(0, PREVIEW_SIZE)} onNavigate={() => setOpen(false)} />

          <Link to="/notifications" className={styles.panelFooter}>
            Все уведомления
          </Link>
        </section>
      )}
    </div>
  );
};

export default NotificationsMenu;
