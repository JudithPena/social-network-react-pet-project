import { Link } from "react-router-dom";
import { useFriends } from "../../context/FriendsContext";
import { mutualFriendsLabel } from "../../utils/plural";
import Avatar from "../Avatar/Avatar";
import styles from "./SideBar.module.css";

const SuggestedFriends = () => {
  const { suggestions, isSent, sendRequest, cancelRequest } = useFriends();

  return (
    <section className={styles.widget} aria-labelledby="suggestions-title">
      <div className={styles.widgetHeader}>
        <h2 id="suggestions-title" className={styles.widgetTitle}>
          Возможно, вы знакомы
        </h2>
        <Link to="/friends/suggestions" className={styles.more}>
          Все
        </Link>
      </div>

      <ul className={styles.list}>
        {suggestions.slice(0, 4).map(({ id, name, mutual }) => {
          const isRequested = isSent(id);
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
                onClick={() => (isRequested ? cancelRequest(id) : sendRequest(id))}
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
