import { useState } from "react";
import { Link } from "react-router-dom";
import { suggestions } from "../../data/sidebar";
import { mutualFriendsLabel } from "../../utils/plural";
import Avatar from "../Avatar/Avatar";
import styles from "./SideBar.module.css";

const SuggestedFriends = () => {
  const [requested, setRequested] = useState([]);

  const toggleRequest = (id) => {
    setRequested((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <section className={styles.widget} aria-labelledby="suggestions-title">
      <div className={styles.widgetHeader}>
        <h2 id="suggestions-title" className={styles.widgetTitle}>
          Возможно, вы знакомы
        </h2>
        <Link to="/friends" className={styles.more}>
          Все
        </Link>
      </div>

      <ul className={styles.list}>
        {suggestions.map(({ id, name, mutual }) => {
          const isRequested = requested.includes(id);
          return (
            <li key={id} className={styles.person}>
              <Avatar name={name} size={40} />
              <div className={styles.personInfo}>
                <div className={styles.personName}>{name}</div>
                <div className={styles.muted}>{mutualFriendsLabel(mutual)}</div>
              </div>
              <button
                type="button"
                className={isRequested ? styles.secondaryButton : styles.primaryButton}
                aria-pressed={isRequested}
                aria-label={isRequested ? `Отменить заявку для ${name}` : `Добавить ${name} в друзья`}
                onClick={() => toggleRequest(id)}
              >
                {isRequested ? "Отменить" : "Добавить"}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SuggestedFriends;
