import { useFriends } from "../../context/FriendsContext";
import PersonCard from "../PersonCard/PersonCard";
import styles from "./Friends.module.css";

const FriendsRequests = () => {
  const { requests, acceptRequest, declineRequest } = useFriends();

  return (
    <section className={styles.card}>
      {requests.length === 0 ? (
        <p className={styles.empty}>Новых заявок нет.</p>
      ) : (
        <ul className={styles.grid}>
          {requests.map(({ id, name, mutual }) => (
            <li key={id}>
              <PersonCard name={name} mutual={mutual}>
                <button
                  type="button"
                  className={styles.primaryButton}
                  aria-label={`Принять заявку от ${name}`}
                  onClick={() => acceptRequest(id)}
                >
                  Принять
                </button>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  aria-label={`Отклонить заявку от ${name}`}
                  onClick={() => declineRequest(id)}
                >
                  Отклонить
                </button>
              </PersonCard>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FriendsRequests;
