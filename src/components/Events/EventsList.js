import { Link, useSearchParams } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { categories } from "../../data/events";
import Tabs from "../Tabs/Tabs";
import EventCard from "./EventCard";
import styles from "./Events.module.css";

const EventsList = ({ onlyGoing = false }) => {
  const { events } = useEvents();
  // The category lives in the URL (?category=it) so a filtered list can be shared
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  const goingCount = events.filter((event) => event.isGoing).length;
  const tabs = [
    { path: "/events", label: "Все события", count: events.length },
    { path: "/events/going", label: "Я иду", count: goingCount },
  ];

  const visible = events
    .filter((event) => !onlyGoing || event.isGoing)
    .filter((event) => !category || event.category === category);

  const selectCategory = (id) => setSearchParams(id ? { category: id } : {});

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <h1 className={styles.title}>События</h1>
        <Tabs items={tabs} label="Разделы событий" />
      </section>

      <div className={styles.filters} role="group" aria-label="Категории">
        {[{ id: null, label: "Все" }, ...categories].map(({ id, label }) => (
          <button
            key={label}
            type="button"
            className={`${styles.chip} ${category === id ? styles.activeChip : ""}`}
            aria-pressed={category === id}
            onClick={() => selectCategory(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>
          {onlyGoing && goingCount === 0 ? (
            <>
              Вы пока никуда не собираетесь. Загляните во <Link to="/events">все события</Link>.
            </>
          ) : (
            "В этой категории событий нет."
          )}
        </p>
      ) : (
        <ul className={styles.grid}>
          {visible.map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventsList;
