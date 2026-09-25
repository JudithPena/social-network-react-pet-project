import { Link, useParams } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { longDate } from "../../utils/date";
import { plural } from "../../utils/plural";
import Avatar from "../Avatar/Avatar";
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder";
import PageStub from "../PageStub/PageStub";
import { categoryLabel } from "./EventCard";
import GoingButton from "./GoingButton";
import styles from "./Events.module.css";

const EventDetails = () => {
  const { id } = useParams();
  const { getEvent } = useEvents();
  const event = getEvent(Number(id));

  if (!event) {
    return <PageStub title="Событие не найдено" text="Возможно, его отменили или ссылка устарела." />;
  }

  const { date, time, title, place, category, image, host, going, friendsGoing, description } = event;

  return (
    <article className={styles.details}>
      <ImagePlaceholder image={image} className={styles.detailsCover} />

      <div className={styles.detailsBody}>
        <Link to="/events" className={styles.backLink}>
          ← Все события
        </Link>
        <span className={styles.tag}>{categoryLabel(category)}</span>
        <h1 className={styles.detailsTitle}>{title}</h1>

        <dl className={styles.facts}>
          <div>
            <dt>Когда</dt>
            <dd>
              {longDate(date)}, {time}
            </dd>
          </div>
          <div>
            <dt>Где</dt>
            <dd>{place}</dd>
          </div>
          <div>
            <dt>Организатор</dt>
            <dd>{host}</dd>
          </div>
          <div>
            <dt>Участники</dt>
            <dd>
              {going} {plural(going, ["человек", "человека", "человек"])}
            </dd>
          </div>
        </dl>

        <GoingButton event={event} large />

        <section>
          <h2 className={styles.sectionTitle}>О событии</h2>
          <p className={styles.description}>{description}</p>
        </section>

        {friendsGoing.length > 0 && (
          <section>
            <h2 className={styles.sectionTitle}>Друзья идут</h2>
            <ul className={styles.friendsGoing}>
              {friendsGoing.map((name) => (
                <li key={name} className={styles.friendGoing}>
                  <Avatar name={name} size={36} />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
};

export default EventDetails;
