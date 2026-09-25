import { NavLink } from "react-router-dom";
import styles from "./Tabs.module.css";

// Row of tabs where each tab is a route; items: [{ path, label, count? }]
const Tabs = ({ items, label, className = "" }) => {
  return (
    <nav className={`${styles.tabs} ${className}`} aria-label={label}>
      {items.map(({ path, label: tabLabel, count }) => (
        <NavLink
          key={path}
          to={path}
          end
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ""}`}
        >
          {tabLabel}
          {count > 0 && <span className={styles.count}>{count}</span>}
        </NavLink>
      ))}
    </nav>
  );
};

export default Tabs;
