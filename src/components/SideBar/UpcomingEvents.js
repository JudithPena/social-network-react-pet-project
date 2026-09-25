import { Link } from "react-router-dom";
import { events } from "../../data/sidebar";
import { usePersistentState } from "../../hooks/usePersistentState";
import { plural } from "../../utils/plural";
import styles from "./SideBar.module.css";

const UpcomingEvents = () => {
  const [goingTo, setGoingTo] = usePersistentState("goingToEvents", []);

  const toggleGoing = (id) => {
    setGoingTo((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <section className={styles.widget} aria-labelledby="events-title">
      <div className={styles.widgetHeader}>
        <h2 id="events-title" className={styles.widgetTitle}>
          Ближайшие события
        </h2>
        <Link to="/events" className={styles.more}>
          Все
        </Link>
      </div>

      <ul className={styles.list}>
        {events.map(({ id, day, month, title, time, place, going }) => {
          const isGoing = goingTo.includes(id);
          const count = going + (isGoing ? 1 : 0);
          return (
            <li key={id} className={styles.event}>
              <div className={styles.date} aria-label={`${day} ${month}`}>
                <span className={styles.day}>{day}</span>
                <span className={styles.month}>{month}</span>
              </div>
              <div className={styles.eventInfo}>
                <div className={styles.eventTitle}>{title}</div>
                <div className={styles.muted}>
                  {time} · {place}
                </div>
                <div className={styles.eventFooter}>
                  <span className={styles.muted}>
                    {count} {plural(count, ["участник", "участника", "участников"])}
                  </span>
                  <button
                    type="button"
                    className={isGoing ? styles.secondaryButton : styles.primaryButton}
                    aria-pressed={isGoing}
                    aria-label={isGoing ? `Не пойду на «${title}»` : `Пойду на «${title}»`}
                    onClick={() => toggleGoing(id)}
                  >
                    {isGoing ? "Иду ✓" : "Пойду"}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default UpcomingEvents;
