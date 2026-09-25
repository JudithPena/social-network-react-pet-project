import { useState } from "react";
import styles from "./NavBar.module.css";

const icons = {
  feed: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
    </svg>
  ),
  profile: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  ),
  friends: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 20a7 7 0 0 1 14 0" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
      <path d="M18 13.5a7 7 0 0 1 4 6.5" />
    </svg>
  ),
  groups: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </svg>
  ),
  messages: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v11H8l-4 4z" />
    </svg>
  ),
  events: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  marketplace: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9l1.5-5h13L20 9" />
      <path d="M4 9h16v11H4z" />
      <path d="M9 20v-6h6v6" />
    </svg>
  ),
  saved: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h12v18l-6-4-6 4z" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1" />
    </svg>
  ),
};

const menu = [
  { id: "feed", label: "Лента" },
  { id: "profile", label: "Профиль" },
  { id: "friends", label: "Друзья", count: 12 },
  { id: "groups", label: "Группы" },
  { id: "messages", label: "Сообщения", count: 3 },
  { id: "events", label: "События" },
  { id: "marketplace", label: "Маркетплейс" },
  { id: "saved", label: "Сохранённое" },
  { id: "settings", label: "Настройки" },
];

const NavBar = () => {
  const [active, setActive] = useState("profile");

  return (
    <nav className={styles.navBar} aria-label="Основное меню">
      <ul className={styles.list}>
        {menu.map(({ id, label, count }) => (
          <li key={id}>
            <button
              type="button"
              className={`${styles.item} ${active === id ? styles.active : ""}`}
              aria-current={active === id ? "page" : undefined}
              onClick={() => setActive(id)}
            >
              <span className={styles.icon}>{icons[id]}</span>
              <span className={styles.label}>{label}</span>
              {count > 0 && <span className={styles.count}>{count}</span>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
