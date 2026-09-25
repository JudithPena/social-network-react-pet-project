import { Link } from "react-router-dom";
import { useMarket } from "../../context/MarketContext";
import { useMessages } from "../../context/MessagesContext";
import { currentUser } from "../../data/profile";
import Avatar from "../Avatar/Avatar";
import styles from "./Header.module.css";

const icons = {
  logo: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="none" strokeWidth="4" />
      <circle cx="16" cy="16" r="5" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
    </svg>
  ),
  messages: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v11H8l-4 4z" />
    </svg>
  ),
  notifications: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" />
      <path d="M10 21h4" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2l2.5 11h11L21 8H6.5" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  ),
};

// Actions with a path lead to a page; notifications will open a popup later
const actions = [
  { id: "home", path: "/", label: "Главная", count: 0 },
  { id: "messages", path: "/messages", label: "Сообщения" },
  { id: "notifications", label: "Уведомления", count: 5 },
  { id: "cart", path: "/marketplace/cart", label: "Корзина" },
];

const Header = () => {
  const { unreadCount } = useMessages();
  const { cartCount } = useMarket();
  const counts = { messages: unreadCount, cart: cartCount };

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">
        <span className={styles.logoIcon}>{icons.logo}</span>
        <span className={styles.logoText}>CircleHub</span>
      </Link>

      <form className={styles.search} role="search" onSubmit={(e) => e.preventDefault()}>
        <span className={styles.searchIcon}>{icons.search}</span>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search..."
          aria-label="Поиск"
        />
      </form>

      <nav className={styles.actions}>
        {actions.map(({ id, path, label, count = counts[id] }) => {
          const content = (
            <>
              {icons[id]}
              {count > 0 && <span className={styles.badge}>{count}</span>}
            </>
          );
          return path ? (
            <Link key={id} className={styles.actionButton} to={path} aria-label={label}>
              {content}
            </Link>
          ) : (
            <button key={id} className={styles.actionButton} type="button" aria-label={label}>
              {content}
            </button>
          );
        })}

        <Link className={styles.profile} to="/profile" aria-label="Профиль">
          <Avatar name={currentUser.name} size={44} />
          <span className={styles.profileInfo}>
            <span className={styles.profileName}>{currentUser.name}</span>
            <span className={styles.profileRole}>@{currentUser.handle}</span>
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
