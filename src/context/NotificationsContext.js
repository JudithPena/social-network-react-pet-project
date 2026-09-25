import { createContext, useContext } from "react";
import { notifications as initialNotifications } from "../data/notifications";
import { usePersistentState } from "../hooks/usePersistentState";

// Notifications for the bell in the header and the notifications page
const NotificationsContext = createContext(null);

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = usePersistentState("notifications", initialNotifications);

  const markRead = (id) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const value = {
    notifications,
    unreadCount: notifications.filter((item) => !item.read).length,
    markRead,
    markAllRead,
  };

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export const useNotifications = () => useContext(NotificationsContext);
