import { useEvents } from "../../context/EventsContext";
import styles from "./Events.module.css";

const GoingButton = ({ event, large = false }) => {
  const { toggleGoing } = useEvents();
  const { id, title, isGoing } = event;

  return (
    <button
      type="button"
      className={`${isGoing ? styles.secondaryButton : styles.primaryButton} ${large ? styles.largeButton : ""}`}
      aria-pressed={isGoing}
      aria-label={isGoing ? `Не пойду на «${title}»` : `Пойду на «${title}»`}
      onClick={() => toggleGoing(id)}
    >
      {isGoing ? "Иду ✓" : "Пойду"}
    </button>
  );
};

export default GoingButton;
