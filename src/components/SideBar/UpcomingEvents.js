import { Link } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { shortDate } from "../../utils/date";
import { plural } from "../../utils/plural";
import styles from "./SideBar.module.css";

const UpcomingEvents = () => {
  const { events, toggleGoing } = useEvents();

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
        {events.slice(0, 3).map(({ id, date, title, time, place, going, isGoing }) => {
          const { day, month } = shortDate(date);
          return (
            <li key={id} className={styles.event}>
              <div className={styles.date} aria-label={`${day} ${month}`}>
                <span className={styles.day}>{day}</span>
                <span className={styles.month}>{month}</span>
              </div>
              <div className={styles.eventInfo}>
                <Link to={`/events/${id}`} className={styles.eventTitle}>
                  {title}
                </Link>
                <div className={styles.muted}>
                  {time} · {place}
                </div>
                <div className={styles.eventFooter}>
                  <span className={styles.muted}>
                    {going} {plural(going, ["участник", "участника", "участников"])}
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
