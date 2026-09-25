import { useSaved } from "../../context/SavedContext";
import styles from "./SaveButton.module.css";

// Bookmark toggle; variant "icon" is a round button for covers, "text" shows a label
const SaveButton = ({ type, id, title, variant = "text", className = "" }) => {
  const { isSaved, toggleSaved } = useSaved();
  const saved = isSaved(type, id);

  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]} ${saved ? styles.saved : ""} ${className}`}
      aria-pressed={saved}
      aria-label={saved ? `Убрать «${title}» из сохранённого` : `Сохранить «${title}»`}
      onClick={() => toggleSaved(type, id)}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3h12v18l-6-4-6 4z" />
      </svg>
      {variant === "text" && <span className={styles.label}>{saved ? "Сохранено" : "Сохранить"}</span>}
    </button>
  );
};

export default SaveButton;
