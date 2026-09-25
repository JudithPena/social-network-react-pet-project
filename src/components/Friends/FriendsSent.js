import { Link } from "react-router-dom";
import { useFriends } from "../../context/FriendsContext";
import PersonCard from "../PersonCard/PersonCard";
import styles from "./Friends.module.css";

const FriendsSent = () => {
  const { sent, cancelRequest } = useFriends();

  return (
    <section className={styles.card}>
      {sent.length === 0 ? (
        <p className={styles.empty}>
          Вы пока никому не отправили заявку. Найдите знакомых в{" "}
          <Link to="/friends/suggestions">рекомендациях</Link>.
        </p>
      ) : (
        <ul className={styles.grid}>
          {sent.map(({ id, name, mutual }) => (
            <li key={id}>
              <PersonCard name={name} mutual={mutual}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  aria-label={`Отменить заявку для ${name}`}
                  onClick={() => cancelRequest(id)}
                >
                  Отменить заявку
                </button>
              </PersonCard>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FriendsSent;
