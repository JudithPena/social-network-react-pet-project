import { Link } from "react-router-dom";
import { categories } from "../../data/events";
import { shortDate } from "../../utils/date";
import { plural } from "../../utils/plural";
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder";
import SaveButton from "../SaveButton/SaveButton";
import GoingButton from "./GoingButton";
import styles from "./Events.module.css";

export const categoryLabel = (id) => categories.find((category) => category.id === id)?.label;

const EventCard = ({ event, horizontal = false }) => {
  const { id, date, time, title, place, category, image, going } = event;
  const { day, month } = shortDate(date);

  return (
    <article className={`${styles.card} ${horizontal ? styles.horizontal : ""}`}>
      <div className={styles.cover}>
        <ImagePlaceholder image={image} className={styles.coverImage} />
        <div className={styles.dateBadge} aria-label={`${day} ${month}`}>
          <span className={styles.day}>{day}</span>
          <span className={styles.month}>{month}</span>
        </div>
        <SaveButton type="event" id={id} title={title} variant="icon" className={styles.coverSave} />
      </div>

      <div className={styles.cardBody}>
        <span className={styles.tag}>{categoryLabel(category)}</span>
        <h2 className={styles.cardTitle}>
          <Link to={`/events/${id}`}>{title}</Link>
        </h2>
        <div className={styles.muted}>
          {time} · {place}
        </div>
        <div className={styles.cardFooter}>
          <span className={styles.muted}>
            {going} {plural(going, ["участник", "участника", "участников"])}
          </span>
          <GoingButton event={event} />
        </div>
      </div>
    </article>
  );
};

export default EventCard;
