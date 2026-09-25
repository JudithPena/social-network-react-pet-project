import { useGroups } from "../../context/GroupsContext";
import styles from "./Groups.module.css";

const JoinButton = ({ group, large = false }) => {
  const { toggleJoin } = useGroups();
  const { id, name, isJoined } = group;

  return (
    <button
      type="button"
      className={`${isJoined ? styles.secondaryButton : styles.primaryButton} ${large ? styles.largeButton : ""}`}
      aria-pressed={isJoined}
      aria-label={isJoined ? `Выйти из группы «${name}»` : `Вступить в группу «${name}»`}
      onClick={() => toggleJoin(id)}
    >
      {isJoined ? "Вы участник ✓" : "Вступить"}
    </button>
  );
};

export default JoinButton;
