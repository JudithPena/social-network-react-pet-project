import { useFriends } from "../../context/FriendsContext";
import PersonCard from "../PersonCard/PersonCard";
import styles from "./Friends.module.css";

const FriendsSuggestions = () => {
  const { suggestions, isSent, sendRequest, cancelRequest, hideSuggestion } = useFriends();

  return (
    <section className={styles.card}>
      {suggestions.length === 0 ? (
        <p className={styles.empty}>Рекомендаций пока нет.</p>
      ) : (
        <ul className={styles.grid}>
          {suggestions.map(({ id, name, mutual }) => {
            const sent = isSent(id);
            return (
              <li key={id}>
                <PersonCard name={name} mutual={mutual}>
                  {sent ? (
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      aria-label={`Отменить заявку для ${name}`}
                      onClick={() => cancelRequest(id)}
                    >
                      Заявка отправлена
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className={styles.primaryButton}
                        aria-label={`Добавить ${name} в друзья`}
                        onClick={() => sendRequest(id)}
                      >
                        Добавить
                      </button>
                      <button
                        type="button"
                        className={styles.secondaryButton}
                        aria-label={`Скрыть ${name} из рекомендаций`}
                        onClick={() => hideSuggestion(id)}
                      >
                        Скрыть
                      </button>
                    </>
                  )}
                </PersonCard>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default FriendsSuggestions;
