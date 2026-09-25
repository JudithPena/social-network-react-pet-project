import { Link } from "react-router-dom";
import SuggestedFriends from "./SuggestedFriends";
import UpcomingEvents from "./UpcomingEvents";
import styles from "./SideBar.module.css";

const SideBar = () => {
  return (
    <aside className={styles.sideBar}>
      <SuggestedFriends />
      <UpcomingEvents />

      <footer className={styles.footer}>
        <nav className={styles.footerLinks} aria-label="О сайте">
          <Link to="/settings">Настройки</Link>
          <a href="https://github.com/JudithPena/social-network-react-pet-project">GitHub</a>
        </nav>
        <p>© {new Date().getFullYear()} CircleHub · пет-проект</p>
      </footer>
    </aside>
  );
};
export default SideBar;
