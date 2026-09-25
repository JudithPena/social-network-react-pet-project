import { useState } from "react";
import { Link } from "react-router-dom";
import { useFriends } from "../../context/FriendsContext";
import PersonCard from "../PersonCard/PersonCard";
import styles from "./Friends.module.css";

const FriendsAll = () => {
  const { friends, removeFriend } = useFriends();
  const [query, setQuery] = useState("");

  const normalized = query.trim().toLowerCase();
  const visible = friends.filter((friend) => friend.name.toLowerCase().includes(normalized));

  return (
    <section className={styles.card}>
      <input
        className={styles.search}
        type="search"
        placeholder="Поиск среди друзей"
        aria-label="Поиск среди друзей"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {friends.length === 0 ? (
        <p className={styles.empty}>У вас пока нет друзей. Загляните в рекомендации.</p>
      ) : visible.length === 0 ? (
        <p className={styles.empty}>Никого не нашлось по запросу «{query.trim()}».</p>
      ) : (
        <ul className={styles.grid}>
          {visible.map(({ id, name, mutual }) => (
            <li key={id}>
              <PersonCard name={name} mutual={mutual}>
                <Link to="/messages" className={styles.primaryButton}>
                  Написать
                </Link>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  aria-label={`Удалить ${name} из друзей`}
                  onClick={() => removeFriend(id)}
                >
                  Удалить
                </button>
              </PersonCard>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FriendsAll;
